use uuid::Uuid;

/// Backend-owned attribution; never accepted from a Tauri request payload.
#[derive(Clone, Debug)]
pub struct AuditContext {
    pub actor_user_id: Option<i32>,
    pub actor_username: Option<String>,
    pub session_reference: Option<Uuid>,
    pub correlation_id: Uuid,
}

impl AuditContext {
    pub fn anonymous() -> Self {
        Self {
            actor_user_id: None,
            actor_username: None,
            session_reference: None,
            correlation_id: Uuid::new_v4(),
        }
    }
}

#[derive(Clone, Copy, Debug, PartialEq)]
pub enum AuditAction {
    Login,
    Logout,
    Register,
    Create,
    Read,
    Update,
    Delete,
}

impl AuditAction {
    pub fn as_str(self) -> &'static str {
        match self {
            Self::Login => "LOGIN",
            Self::Logout => "LOGOUT",
            Self::Register => "REGISTER",
            Self::Create => "CREATE",
            Self::Read => "READ",
            Self::Update => "UPDATE",
            Self::Delete => "DELETE",
        }
    }
}

#[derive(Clone, Copy, Debug, PartialEq)]
pub enum AuditOutcome {
    Success,
    Failure,
    Denied,
    NoChange,
}

impl AuditOutcome {
    pub fn as_str(self) -> &'static str {
        match self {
            Self::Success => "SUCCESS",
            Self::Failure => "FAILURE",
            Self::Denied => "DENIED",
            Self::NoChange => "NO_CHANGE",
        }
    }
}

/// These variants are also the allowlist for SQL identifiers in snapshots.
#[derive(Clone, Copy, Debug, PartialEq)]
pub enum AuditEntity {
    Users,
    Customers,
    Items,
    Suppliers,
    Orders,
    SalesOrders,
    SalesOrderDetails,
    OrderStatuses,
}

impl AuditEntity {
    pub fn table(self) -> &'static str {
        match self {
            Self::Users => "Users",
            Self::Customers => "Customers",
            Self::Items => "Items",
            Self::Suppliers => "Suppliers",
            Self::Orders => "Orders",
            Self::SalesOrders => "SalesOrders",
            Self::SalesOrderDetails => "SalesOrderDetails",
            Self::OrderStatuses => "OrderStatuses",
        }
    }

    pub fn key(self) -> &'static str {
        match self {
            Self::Users => "UserId",
            Self::Items => "ItemCode",
            _ => "Id",
        }
    }

    pub fn from_permission(permission: &str) -> anyhow::Result<(Self, AuditAction)> {
        let (resource, operation) = permission
            .split_once('.')
            .ok_or_else(|| anyhow::anyhow!("Invalid permission code"))?;
        let entity = match resource {
            "customers" => Self::Customers,
            "items" => Self::Items,
            "suppliers" => Self::Suppliers,
            "orders" => Self::Orders,
            "sales_orders" => Self::SalesOrders,
            "so_details" => Self::SalesOrderDetails,
            "statuses" => Self::OrderStatuses,
            _ => anyhow::bail!("Unknown audit resource"),
        };
        let action = match operation {
            "view" => AuditAction::Read,
            "create" => AuditAction::Create,
            "update" => AuditAction::Update,
            "delete" => AuditAction::Delete,
            _ => anyhow::bail!("Unknown audit action"),
        };
        Ok((entity, action))
    }
}

pub struct AuditEvent {
    pub context: AuditContext,
    pub action: AuditAction,
    pub entity: AuditEntity,
    pub entity_id: Option<i32>,
    pub outcome: AuditOutcome,
    pub reason: Option<&'static str>,
    pub attempted_username: Option<String>,
    pub before_data: Option<String>,
    pub after_data: Option<String>,
}

impl AuditEvent {
    pub fn new(
        context: &AuditContext,
        action: AuditAction,
        entity: AuditEntity,
        entity_id: Option<i32>,
        outcome: AuditOutcome,
    ) -> Self {
        Self {
            context: context.clone(),
            action,
            entity,
            entity_id,
            outcome,
            reason: None,
            attempted_username: None,
            before_data: None,
            after_data: None,
        }
    }
}
