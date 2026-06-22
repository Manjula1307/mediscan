# 🏥 MediScan — AI Medical Report Analyser

> Upload a blood test, prescription, or scan report — get a plain-language explanation, flagged abnormal values, and doctor consultation questions powered by AI.

---

## 🚧 Status: In Development

Core backend (auth, file upload, AI analysis, report history) is complete. Frontend pages are actively being built.

---

## 💡 Why This Project

Medical reports confuse most people. MediScan solves this by letting users upload a PDF or image of their report and instantly get:
- A simple explanation of what the report means
- Highlighted values that are outside the normal range
- AI-generated questions to ask their doctor at the next appointment

---

## ✨ Features

- 📄 Upload blood test / prescription / scan reports (PDF or image)
- 🤖 AI reads and explains each parameter in plain English
- 🚦 Flags abnormal values — colour-coded red / yellow / green
- 💬 Generates 3–5 personalised questions to ask your doctor
- 🗂️ Save and view past report analyses (history per user)
- 🔐 JWT-based user authentication (register / login / logout)

---

## 🛠️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React.js + TypeScript + Tailwind CSS + Vite |
| Backend    | Node.js + Express.js              |
| Database   | MySQL                             |
| AI Model   | Llama 3.2 via Ollama              |
| File Upload| Multer                            |
| Auth       | JWT (JSON Web Tokens) + bcrypt    |
| Deploy     | Vercel (frontend) + Render (backend) + Railway (MySQL) |

---

## 📁 Project Structure

```
mediscan/
├── backend/
│   ├── config/
│   │   ├── db.js              # MySQL connection pool
│   │   └── schema.sql         # Database schema
│   ├── controllers/
│   │   ├── authController.js  # Register / Login logic
│   │   └── reportController.js # Upload, analyse, fetch reports
│   ├── middleware/
│   │   ├── auth.js            # JWT verification middleware
│   │   └── upload.js          # Multer file upload config
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── reportRoutes.js
│   ├── services/
│   │   └── ollamaService.js   # AI prompt + Ollama API call
│   └── server.js
│
└── frontend/
    └── src/
        ├── api/               # Axios instance + API calls
        ├── context/           # AuthContext (global auth state)
        ├── types/             # TypeScript interfaces
        └── App.tsx
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- MySQL running locally
- [Ollama](https://ollama.com) installed with `llama3.2` model pulled

### 1. Clone the repo
```bash
git clone https://github.com/Manjula1307/mediscan.git
cd mediscan
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:
```env
PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=mediscan
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

Import the database schema:
```bash
mysql -u root -p < config/schema.sql
```

Start the backend:
```bash
npm start
```

### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Start Ollama
```bash
ollama run llama3.2
```

The app will be running at `http://localhost:5173`

---

## 🔌 API Endpoints

| Method | Endpoint               | Description               | Auth Required |
|--------|------------------------|---------------------------|---------------|
| POST   | `/api/auth/register`   | Create account            | No            |
| POST   | `/api/auth/login`      | Login, returns JWT        | No            |
| POST   | `/api/reports/upload`  | Upload + analyse report   | Yes           |
| GET    | `/api/reports/history` | Fetch all past reports    | Yes           |
| GET    | `/api/reports/:id`     | Fetch a specific report   | Yes           |

---

## 🤖 AI Analysis Flow

1. User uploads a PDF report
2. Backend extracts text using `pdf-parse`
3. Extracted text is sent to Llama 3.2 (via Ollama) with a structured prompt
4. AI responds in JSON with:
   - `summary` — plain-language explanation
   - `flags` — abnormal parameters with status (high/low) and concern
   - `questions` — personalised doctor consultation questions
5. Results are saved to MySQL and returned to the frontend

---

## 🗺️ Roadmap

- [x] Backend: Auth system (register/login/JWT)
- [x] Backend: PDF upload + text extraction
- [x] Backend: AI analysis via Ollama
- [x] Backend: Report history (save + fetch)
- [x] Frontend: TypeScript types + Auth context
- [ ] Frontend: Login / Register pages
- [ ] Frontend: Upload page with drag-and-drop
- [ ] Frontend: Analysis results page (flags + questions)
- [ ] Frontend: Report history page
- [ ] Deployment (Vercel + Render + Railway)

---

## 👩‍💻 Author

**Manjula** — [GitHub](https://github.com/Manjula1307)