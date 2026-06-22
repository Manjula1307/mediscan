CREATE DATABASE IF NOT EXISTS mediscan;
USE mediscan;

-- Stores user accounts
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stores each uploaded report and its AI analysis
CREATE TABLE IF NOT EXISTS reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,       -- original file name
  file_path VARCHAR(500) NOT NULL,      -- where we saved it on disk
  report_type VARCHAR(100),             -- "Blood Test", "Prescription" etc
  ai_summary TEXT,                      -- AI plain language explanation
  ai_flags TEXT,                        -- abnormal values AI found (JSON string)
  ai_questions TEXT,                    -- doctor questions AI generated
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);