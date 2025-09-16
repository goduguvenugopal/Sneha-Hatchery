⚡ Generator Logs Management System

A full-stack Progressive Web Application (PWA) for tracking generator usage and managing employees.
Employees can log generator runtime, while managers and incharges have access to administration features like employee management and system monitoring.
The system provides:

Real-time runtime tracking

Printable reports

Automated alerts (via cron jobs + web push)

Installable PWA experience for mobile & desktop

📌 Features
👷 Employee Features

Start and stop generator logging.

View personal logs in a tabular format.

Live runtime counter → updates every second when generator is running.

Receive Web Push Notifications every 10 minutes with total running duration.

Install the app as a PWA and get alerts even when the browser is closed.

🧑‍💼 Incharge & Manager Features

Access administration dashboard.

Manage employees (CRUD operations).

Monitor generator logs across all employees.

Calculate and view total running hours.

Generate and print reports for audits.

⏱ Generator Runtime Tracking

Logs include onTime, offTime, duration (minutes → hours & minutes).

Auto-calculated total running hours from all logs.

Duration formatting (e.g., 2h 15m).

🔔 Cron Jobs & Alerts

node-cron runs every 10 minutes.

Triggers Web Push Notifications to all subscribed employees.

Example push: "Generator running for 2h 30m"

📲 Web Push + PWA

Service Worker registered in frontend.

Subscribes users with VAPID keys.

Notifications sent via backend using web-push.

Works offline (cached assets).

Employees can install app on mobile/desktop home screen for quick access.

⚙️ Tech Stack
🔹 Frontend

React (Vite + Tailwind CSS)

React Router DOM

Axios (API communication)

PWA (Service Worker + Manifest) for installability

Web Push Notifications integrated

🔹 Backend

Node.js & Express.js

MongoDB (Mongoose ODM)

node-cron for automated duration alerts

web-push for sending push notifications

Role-based Access Control (RBAC):

Employee → operate generator

Incharge → limited admin

Manager → full admin access

🚀 Deployment

Frontend → Vercel (optimized React + Vite build, PWA support)

Backend → Railway (auto-deployment & scaling)

Database → MongoDB Atlas (cloud hosted)