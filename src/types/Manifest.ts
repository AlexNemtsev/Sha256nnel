import type { FileData } from './FileData';

export interface Manifest {
  generated_at: string;
  tool: string;
  files: FileData[];
}
