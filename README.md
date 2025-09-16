⚡ Generator Logs Management System

A full-stack web application for tracking generator usage and managing employees. Employees can log generator runtime, while managers and incharges have access to administration features like employee management and system monitoring. The system also provides real-time runtime tracking, printable reports, and automated alerts via cron jobs.

📌 Features
👷 Employee Features

Start and stop generator logging.

View own logs in a tabular format.

Receive cron job alerts every 10 minutes with total running duration.

🧑‍💼 Incharge & Manager Features

Access administration dashboard.

Manage employees (CRUD operations).

Monitor generator logs across all employees.

Calculate and view total running hours.

Generate printable reports for audits.

⏱ Generator Runtime Tracking

Live runtime counter → updates every second when generator is running.

Logs include onTime, offTime, and duration (minutes → hours & minutes).

Auto-calculated total running hours from all logs.

🔔 Cron Jobs & Alerts

Cron job runs every 10 minutes.

Automatically sends runtime duration alerts to all employees.

Keeps team informed about generator performance without manual checks.

⚙️ Tech Stack
🔹 Frontend

React (Vite + Tailwind CSS)

React Router DOM

Axios (API communication)

🔹 Backend

Node.js & Express.js

MongoDB (Mongoose ODM)

node-cron for automated alerts

Role-based Access Control (RBAC) for employees, incharge, and manager


🚀 Deployment

Frontend: Vercel

Backend: Railway 

Database: MongoDB Atlas


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
