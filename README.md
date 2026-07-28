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

## How to Run The App
1. Clone this repo
```bash
git clone https://github.com/alain-cheng/Project-Irys.git
``` 

2. Ensure you are within the `/app` directory and perform an NPM install
```bash
npm i
```
3. Make sure Rust is installed on your system before running the application. Go to [rust-lang.org/tools/install/](rust-lang.org/tools/install/) then run `rustup-init.exe` and follow onscreen instructions.

4. After Rust is installed, run the command `npx tauri dev` begin running the app. An application window should open in a moment.
