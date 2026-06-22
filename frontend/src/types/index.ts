export interface User {
  id: number;
  name: string;
  email: string;
}

export interface ReportFlag {
  parameter: string;
  value: string;
  normal_range: string;
  status: 'high' | 'low' | 'normal';
  concern: string;
}

export interface Report {
  id: number;
  filename: string;
  ai_summary: string;
  flags: ReportFlag[];
  questions: string[];
  created_at: string;
}

export interface ReportSummary {
  id: number;
  filename: string;
  ai_summary: string;
  created_at: string;
}