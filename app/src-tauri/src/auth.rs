use std::sync::Mutex;
use std::time::{Duration, Instant};

#[derive(Default)]
struct SessionData {
    user_id: Option<i32>,
    revision: u64,
    failures: u32,
    locked_until: Option<Instant>,
}

/// One session per running application. Nothing is persists in the webview.
#[derive(Default)]
pub struct AuthSession(Mutex<SessionData>);

impl AuthSession {
    pub fn user_id(&self) -> anyhow::Result<Option<i32>> {
        Ok(self
            .0
            .lock()
            .map_err(|_| anyhow::anyhow!("Session unavailable"))?
            .user_id)
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
        state.user_id = None;
        state.revision += 1;
        Ok(state.revision)
    }

    pub fn finish_login(&self, revision: u64, user_id: Option<i32>) -> anyhow::Result<()> {
        let mut state = self
            .0
            .lock()
            .map_err(|_| anyhow::anyhow!("Session unavailable"))?;
        anyhow::ensure!(
            state.revision == revision,
            "Sign-in cancelled. Please try again."
        );
        state.user_id = user_id;
        if user_id.is_some() {
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

    pub fn logout(&self) -> anyhow::Result<()> {
        let mut state = self
            .0
            .lock()
            .map_err(|_| anyhow::anyhow!("Session unavailable"))?;
        state.user_id = None;
        state.revision += 1;
        Ok(())
    }

    pub fn clear_user(&self, id: i32) -> anyhow::Result<()> {
        let mut state = self
            .0
            .lock()
            .map_err(|_| anyhow::anyhow!("Session unavailable"))?;
        if state.user_id == Some(id) {
            state.user_id = None;
            state.revision += 1;
        }
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

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
