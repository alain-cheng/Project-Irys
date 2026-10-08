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
