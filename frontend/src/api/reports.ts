import api from './axios';
import type { ReportSummary, Report } from '../types';

export const uploadReport = async (file: File): Promise<Report> => {
  const formData = new FormData();
  formData.append('report', file);
  const response = await api.post('/reports/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.report;
};

export const getMyReports = async (): Promise<ReportSummary[]> => {
  const response = await api.get('/reports/history');
  return response.data.reports;
};

export const getReportById = async (id: number): Promise<Report> => {
  const response = await api.get(`/reports/${id}`);
  return response.data.report;
};