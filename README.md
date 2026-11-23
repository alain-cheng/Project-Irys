# Project-Irys
This project is a hardware inventory and order management system I am developing to demonstrate business application development with React, Javascript, Tauri, and other technologies.

The repository contains the demo version of this system I mainly intended for portfolio purposes. It showcases workflows such as customer management, sales, invoicing, payment tracking, and reporting features using mock data.

The production version of this system will contain additional features, business-specific workflows, database integration and migration utilities, security features, and other business-specific customizations not included in this public repo.

---

**Planned Features**:
- Database Integration
- DB Migration Tools
- User Authentication
- Role based access control
- Audit logs

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
permission/activation changes, then removes its test accounts. It does not run in CI.
