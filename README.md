# 🔐 Subscription Management System API

A **production-ready** backend API for managing user subscriptions, built with security, scalability, and modularity in mind. It supports authentication, real-time database operations, advanced rate-limiting, email automation, and more.

---

## 🚀 Tech Stack

- **Node.js** – Runtime environment
- **Express.js** – Backend framework
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB object modeling
- **JWT** – Secure user authentication
- **Arcjet** – Rate limiting & bot protection
- **Upstash** – Automated email reminders via QStash
- **dotenv** – Environment variable management

---

## 🔋 Features

- ✅ **JWT Authentication**: Secure login/signup with token-based auth.
- ✅ **User & Subscription CRUD**: Fully-featured subscription management.
- ✅ **Advanced Rate Limiting**: Powered by **Arcjet** to prevent abuse and bot traffic.
- ✅ **Database Modeling**: Scalable models with relationships using **Mongoose**.
- ✅ **Global Error Handling**: Centralized error handling & validation.
- ✅ **Logging Mechanisms**: Built-in logs for debugging & monitoring.
- ✅ **Email Reminders**: Automated workflows for user engagement via **Upstash/QStash**.
- ✅ **Production-Level Code Structure**: Separation of concerns, reusable modules, middleware, and services.
- ✅ **Secure Environment Handling**: Secrets managed via `.env` config.
- ✅ **Middleware Integration**: For logging, parsing, validation, and protection.

---

---

## 🤸 Quick Start

### 🔧 Prerequisites

Ensure the following tools are installed:

- **[Node.js](https://nodejs.org/)**
- **[npm](https://www.npmjs.com/)**
- **[Git](https://git-scm.com/)**

---

### 📥 Installation

1. **Clone the repository:**

```bash
git clone https:https://github.com/devang0426/Subscription-Management-API.git
cd Subscription-Management-API
npm install

```
2.**Setup local env variables**
# Server
PORT=5500
SERVER_URL=http://localhost:5500
NODE_ENV=development

# MongoDB
DB_URI=your_mongodb_connection_string

# JWT Auth
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

# Arcjet
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development

# Upstash / QStash
QSTASH_URL=http://127.0.0.1:8080
QSTASH_TOKEN=your_qstash_token

# NODEMAILER
EMAIL_PASSWORD=

npm run dev
Open http://localhost:5500 in your browser or any HTTP client to test the project.
🔐 API Authentication

All protected routes require a valid JWT token. Include it in the Authorization header:

```Authorization: Bearer <your_token_here>

🛠 Available Scripts
npm run dev         # Run in development mode with nodemon
npm run start       # Start the production server
npm run lint        # Lint your code

📬 Email Automation with Upstash

Automated email reminders are powered by QStash
, ensuring scheduled workflows for:

Subscription expiration reminders

Trial notifications

Renewal alerts
