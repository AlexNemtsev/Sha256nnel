import type { FileData } from './FileData';

interface Status {
  ok?: boolean;
  message?: string;
}

export interface ValidationResult extends FileData {
  expectedHash?: string;
  status: Status;
}
