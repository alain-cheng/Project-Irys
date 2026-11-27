# Project-Irys
This project is a hardware inventory and order management system I am developing to demonstrate business application development with React, Javascript, Tauri, and other technologies.

The repository contains the demo version of this system I mainly intended for portfolio purposes. It showcases workflows such as customer management, sales, invoicing, payment tracking, and reporting features using mock data.

The production version of this system will contain additional features, business-specific workflows, database integration and migration utilities, security features, and other business-specific customizations not included in this public repo.

---

**Planned Features**:
- Audit log viewer

## Requirements
- [Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Rust](rust-lang.org/tools/install/)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- [sqlcmd](https://learn.microsoft.com/en-us/sql/tools/sqlcmd/sqlcmd-download-install?)

## How to Run
1. Clone this repo
```bash
git clone https://github.com/alain-cheng/Project-Irys.git
``` 

2. Ensure you are inside the `/app` directory and perform an NPM install
```bash
npm i
```
3. Make sure Rust is installed on your system before running the application. Go to [rust-lang.org/tools/install/](rust-lang.org/tools/install/) then run `rustup-init.exe` and follow onscreen instructions.

4. Open powershell and run `.\database\scripts\setup-dev.ps1`, this will create the development database on localhost and populate it with mock data.

5. Run `npx tauri dev` begin running the app. The application window should open in a moment.

# OpenAI Codex Agent Notes

## Development authentication

After database setup, use **Create an account (temporary)** on the login screen.
The first registered account becomes an Administrator; later accounts become Staff.
Roles are assigned in Rust, and registration creates active accounts with no linked employee.
There are no seeded users or default passwords. Usernames are case insensitive and
use 3–64 letters, numbers, dots, underscores, or hyphens. Passwords use 12–128 characters
and are stored as salted Argon2id hashes; hashes are never returned to the frontend.

The seed defines Administrator (all permissions), Staff (view/create/update business
records, view statuses), and Viewer (view only). Existing database commands enforce
these permissions in Rust and reload activation and permissions for each request.
The current screens do not yet hide controls according to permissions.
The login session stays in Rust memory and ends on logout or application restart.

Registration is intentionally public for development and should be replaced with an
administrator-managed account creation flow before internal deployment. Role assignment,
account deactivation, and password reset screens are not implemented yet. Application
permissions do not restrict someone who independently has direct SQL Server access.

Run backend unit tests from `app/src-tauri` with `cargo test --lib`. A separate optional
SQL Server authentication test requires a freshly seeded development database with
an empty Users table:

```powershell
cargo test --lib local_database_auth_roundtrip -- --ignored
```

This test creates temporary accounts, exercises registration, login, logout, and
permission/activation changes, then deactivates its test accounts to preserve their
audit history. It does not run in CI.

## Audit logging

Rust writes audit events directly to `dbo.AuditLogs`. This covers registration,
successful/failed/throttled login attempts, logout, session invalidation, permission
denials, and create/update/delete operations for Customers, Items, Suppliers, Orders,
SalesOrders, SalesOrderDetails, and OrderStatuses. Ordinary successful reads and page
navigation are not logged. There is no frontend audit viewer or audit-write command.

Business writes and their audit records use the same SQL connection and transaction.
If an audit insert fails, the business write rolls back. Failed writes are recorded
after rollback; missing records and identical updates produce `NO_CHANGE` events.
Backend session identity supplies the actor, and SQL Server supplies `OccurredAtUtc`.
Correlation IDs group related operations and session references group one login's
activity. Neither identifier is an authentication credential.

Snapshots contain explicitly selected database fields, not frontend payloads.
Passwords, password hashes, contact details, tax IDs, and free-text notes are excluded.
An edit affecting only omitted fields is still logged as `SUCCESS`, with reason
`REDACTED_FIELDS_CHANGED`, without recording the private contents.

Login is rejected if its successful audit event cannot be stored. Logout still clears
the session if logging fails. Rejected attempts and failures are recorded on a best
effort basis: if SQL Server itself is unavailable, a diagnostic is logged without
credentials, but no database audit row can be guaranteed. Direct SQL changes bypass
application auditing; database administrators can modify the audit table. Application
crashes do not produce a reliable logout event.

Inspect recent events directly in SQL Server:

```sql
SELECT TOP (100)
    Id, OccurredAtUtc, ActorUserId, ActorUsername, AttemptedUsername,
    Action, EntityType, EntityId, Outcome, ReasonCode,
    BeforeData, AfterData, CorrelationId, SessionReference
FROM dbo.AuditLogs
ORDER BY Id DESC;
```

Filter by `EntityType` and `EntityId` to trace a record, or by `SessionReference` to
trace activity from one login. Audit entries have no application edit/delete endpoints,
and referenced users should be deactivated rather than deleted.

Run the optional database integration test from `app/src-tauri`:

```powershell
cargo test --lib local_database_audit_roundtrip -- --ignored
```

It requires the current schema and role/status seeds, and can run with existing users.
It creates uniquely named `audit_test_*` accounts and test business records. Business
records are removed through audited services; the test accounts remain inactive and
the audit evidence is retained. Existing user and business records are not changed.
