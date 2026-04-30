import type { FileData } from '../HashesTable';

export interface Manifest {
  generated_at: string;
  tool: string;
  files: FileData[];
}
