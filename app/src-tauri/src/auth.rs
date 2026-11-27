use crate::models::audit_log::AuditContext;
use std::sync::Mutex;
use std::time::{Duration, Instant};
use uuid::Uuid;

#[derive(Clone)]
pub struct SessionIdentity {
    pub user_id: i32,
    pub username: String,
    pub reference: Uuid,
}

impl SessionIdentity {
    pub fn audit_context(&self) -> AuditContext {
        AuditContext {
            actor_user_id: Some(self.user_id),
            actor_username: Some(self.username.clone()),
            session_reference: Some(self.reference),
            correlation_id: Uuid::new_v4(),
        }
    }
}

#[derive(Default)]
struct SessionData {
    identity: Option<SessionIdentity>,
    revision: u64,
    failures: u32,
    locked_until: Option<Instant>,
}

/// One backend-owned session per running application.
#[derive(Default)]
pub struct AuthSession(Mutex<SessionData>);

impl AuthSession {
    pub fn identity(&self) -> anyhow::Result<Option<SessionIdentity>> {
        Ok(self
            .0
            .lock()
            .map_err(|_| anyhow::anyhow!("Session unavailable"))?
            .identity
            .clone())
    }

    #[cfg(test)]
    pub fn user_id(&self) -> anyhow::Result<Option<i32>> {
        Ok(self.identity()?.map(|identity| identity.user_id))
    }

    pub fn begin_login(&self) -> anyhow::Result<u64> {
        let mut state = self
            .0
            .lock()
            .map_err(|_| anyhow::anyhow!("Session unavailable"))?;
        if state
            .locked_until
            .is_some_and(|until| until > Instant::now())
        {
            anyhow::bail!("Too many login attempts. Try again in 30 seconds.");
        }
        if state.locked_until.take().is_some() {
            state.failures = 0;
        }
        state.identity = None;
        state.revision += 1;
        Ok(state.revision)
    }

    pub fn complete_login(
        &self,
        revision: u64,
        identity: Option<SessionIdentity>,
    ) -> anyhow::Result<()> {
        let mut state = self
            .0
            .lock()
            .map_err(|_| anyhow::anyhow!("Session unavailable"))?;
        anyhow::ensure!(
            state.revision == revision,
            "Sign-in cancelled. Please try again."
        );
        let success = identity.is_some();
        state.identity = identity;
        if success {
            state.failures = 0;
            state.locked_until = None;
        } else {
            state.failures += 1;
            if state.failures >= 5 {
                state.locked_until = Some(Instant::now() + Duration::from_secs(30));
            }
        }
        Ok(())
    }

    pub fn end_session(&self) -> anyhow::Result<Option<SessionIdentity>> {
        let mut state = self
            .0
            .lock()
            .map_err(|_| anyhow::anyhow!("Session unavailable"))?;
        let identity = state.identity.take();
        state.revision += 1;
        Ok(identity)
    }

    pub fn invalidate(&self, reference: Uuid) -> anyhow::Result<Option<SessionIdentity>> {
        let mut state = self
            .0
            .lock()
            .map_err(|_| anyhow::anyhow!("Session unavailable"))?;
        if state
            .identity
            .as_ref()
            .is_some_and(|identity| identity.reference == reference)
        {
            let identity = state.identity.take();
            state.revision += 1;
            Ok(identity)
        } else {
            Ok(None)
        }
    }

    #[cfg(test)]
    pub fn clear_user(&self, id: i32) -> anyhow::Result<()> {
        let mut state = self
            .0
            .lock()
            .map_err(|_| anyhow::anyhow!("Session unavailable"))?;
        if state
            .identity
            .as_ref()
            .is_some_and(|identity| identity.user_id == id)
        {
            state.identity = None;
            state.revision += 1;
        }
        Ok(())
    }

    #[cfg(test)]
    pub fn finish_login(&self, revision: u64, user_id: Option<i32>) -> anyhow::Result<()> {
        self.complete_login(
            revision,
            user_id.map(|user_id| SessionIdentity {
                user_id,
                username: "test-user".into(),
                reference: Uuid::new_v4(),
            }),
        )
    }

    #[cfg(test)]
    pub fn logout(&self) -> anyhow::Result<()> {
        self.end_session().map(|_| ())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn an_old_lookup_cannot_invalidate_a_new_session_for_the_same_user() {
        let session = AuthSession::default();
        let revision = session.begin_login().unwrap();
        session.finish_login(revision, Some(1)).unwrap();
        let old = session.identity().unwrap().unwrap();
        let revision = session.begin_login().unwrap();
        session.finish_login(revision, Some(1)).unwrap();
        assert!(session.invalidate(old.reference).unwrap().is_none());
        assert_eq!(session.user_id().unwrap(), Some(1));
    }

    #[test]
    fn logout_prevents_an_inflight_login_from_restoring_the_session() {
        let session = AuthSession::default();
        let revision = session.begin_login().unwrap();
        session.logout().unwrap();
        assert!(session.finish_login(revision, Some(1)).is_err());
        assert_eq!(session.user_id().unwrap(), None);
    }

    #[test]
    fn repeated_failed_logins_are_throttled() {
        let session = AuthSession::default();
        for _ in 0..5 {
            let revision = session.begin_login().unwrap();
            session.finish_login(revision, None).unwrap();
        }
        assert!(session.begin_login().is_err());
    }

    #[test]
    fn clearing_an_old_user_does_not_sign_out_a_new_user() {
        let session = AuthSession::default();
        let revision = session.begin_login().unwrap();
        session.finish_login(revision, Some(2)).unwrap();
        session.clear_user(1).unwrap();
        assert_eq!(session.user_id().unwrap(), Some(2));
    }
}
