export enum ReportFormat {
  PDF = 'pdf',
  CSV = 'csv',
  JSON = 'json',
}

export type ReportCategory =
  | 'attendance'
  | 'behavior'
  | 'progress'
  | 'portfolio';

export type UserRole = 'admin' | 'teacher' | 'student' | 'parent' | 'viewer';

export interface AuditFields {
  id: number;
  createdAt: string;
  updatedAt?: string;
}

export interface ReportRecord extends AuditFields {
  title: string;
  description?: string;
  category: ReportCategory;
  format: ReportFormat;
  status: 'DRAFT' | 'READY' | 'PROCESSING' | 'FAILED';
  generatedByUserId: number;
  studentId?: number;
  classId?: number;
  payload?: Record<string, unknown>;
}
