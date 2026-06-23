# 🏥 MediScan — Medical Report Analyser

MediScan is a full-stack web application that lets users upload medical reports (PDF) and get an instant AI-powered plain-language analysis — including abnormal value detection, health summaries, and questions to ask their doctor.

**Live App → [mediscan-gamma-neon.vercel.app](https://mediscan-gamma-neon.vercel.app)**

---

## ✨ Features

- 📄 **PDF Upload** — Upload any medical lab report in PDF format
- 🤖 **AI Analysis** — Powered by Groq (LLaMA 3.3 70B) to extract and explain results
- 🚨 **Abnormal Detection** — Flags HIGH / LOW values with color-coded badges
- 💬 **Doctor Questions** — Auto-generates questions to ask your doctor
- 📋 **Report History** — View all previously uploaded and analysed reports
- 🔐 **Auth** — Secure JWT-based user registration and login

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4 |
| Backend | Node.js, Express 5 |
| Database | MySQL (Railway) |
| AI | Groq API — LLaMA 3.3 70B Versatile |
| PDF Parsing | pdf-parse v2 |
| Auth | JWT + bcryptjs |
| Frontend Deploy | Vercel |
| Backend Deploy | Render |
| Database Host | Railway |

---

## 📁 Project Structure

```
mediscan/
├── frontend/                  # React + Vite app
│   ├── src/
│   │   ├── api/               # Axios API calls (auth, reports)
│   │   ├── components/        # Header, ReportResult, UploadSection, ReportHistory
│   │   ├── context/           # AuthContext (JWT state)
│   │   ├── pages/             # LandingPage, AuthPage, Dashboard
│   │   └── types/             # TypeScript interfaces
│   ├── .env                   # VITE_API_URL
│   └── vercel.json            # SPA rewrite rules
│
└── backend/                   # Express API
    ├── config/
    │   ├── db.js              # MySQL connection pool
    │   └── schema.sql         # Database schema
    ├── controllers/
    │   ├── authController.js  # Register / Login
    │   └── reportController.js # Upload, History, Get by ID
    ├── middleware/
    │   ├── auth.js            # JWT verification middleware
    │   └── upload.js          # Multer file handler
    ├── routes/
    │   ├── authRoutes.js
    │   └── reportRoutes.js
    ├── services/
    │   └── ollamaService.js   # Groq AI integration
    ├── .env                   # Environment variables
    └── server.js              # Express app entry point
```

---

## ⚙️ Environment Variables

### Backend `.env`

```env
PORT=5000
DB_HOST=your_railway_mysql_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=mediscan
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
NODE_ENV=production
GROQ_API_KEY=your_groq_api_key
FRONTEND_URL=https://mediscan-gamma-neon.vercel.app
```

### Frontend `.env`

```env
VITE_API_URL=https://your-mediscan-backend.onrender.com/api
```

---

## 🗄️ Database Setup

Run the following SQL on your Railway MySQL instance to create the required tables:

```sql
CREATE DATABASE IF NOT EXISTS mediscan;
USE mediscan;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  report_type VARCHAR(100),
  ai_summary TEXT,
  ai_flags TEXT,
  ai_questions TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 🚀 Local Development

### Prerequisites

- Node.js 18+
- MySQL running locally
- Groq API key — get one free at [console.groq.com](https://console.groq.com)

### 1. Clone the repo

```bash
git clone https://github.com/Manjula1307/mediscan.git
cd mediscan
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file using the variables listed above, then:

```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Then:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## ☁️ Deployment

### Frontend → Vercel

1. Push the `frontend/` folder to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Set **Root Directory** to `frontend`
4. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com/api`
5. Deploy — Vercel auto-handles the SPA rewrites via `vercel.json`

### Backend → Render

1. Push the `backend/` folder to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `node server.js`
5. Add all backend environment variables in the Render dashboard
6. Deploy

### Database → Railway

1. Create a new **MySQL** service on [railway.app](https://railway.app)
2. Copy the connection credentials into your backend `.env`
3. Run the schema SQL from the **Database Setup** section above using Railway's query editor

---

## 🔌 API Reference

### Auth

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |

### Reports *(requires Authorization: Bearer `<token>`)*

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/reports/upload` | Upload a PDF and get AI analysis |
| GET | `/api/reports/history` | Get all reports for logged-in user |
| GET | `/api/reports/:id` | Get full details of a single report |

---

## 🐛 Known Bugs Fixed

| Bug | File | Fix |
|---|---|---|
| Abnormal values showing green NORMAL badge | `frontend/src/components/ReportResult.tsx` | Added explicit `case 'normal'` in switch; changed `default` to amber ABNORMAL to prevent false-green for unexpected AI status values |
| AI Summary blank after fresh upload | `backend/controllers/reportController.js` | Upload response returned `summary` but frontend expected `ai_summary` — renamed to match |
| AI returning `"normal"` status inside flags | `backend/services/ollamaService.js` | Strengthened prompt to only allow `"high"` or `"low"` as status values in flags |

---

## 📄 License

MIT — free to use and modify.
