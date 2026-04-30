import type { FileData } from '../HashesTable';

import styles from './ValidationTable.module.css';

interface Status {
  ok?: boolean;
  message?: string;
}

export interface ValidationResult extends FileData {
  expectedHash?: string;
  status: Status;
}

interface ValidationTableProps {
  files: ValidationResult[];
}

export const ValidationTable = (props: ValidationTableProps) => {
  const { files } = props;

  return (
    <table>
      <thead>
        <tr>
          <th>Файл</th>
          <th>Статус</th>
          <th>Ожидаемый хэш</th>
          <th>Фактический хэш</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file) => {
          return (
            <tr key={file.name}>
              <td>{file.name}</td>
              <td className={file.status.ok ? styles.statusOk : styles.statusFail}>
                {file.status.message}
              </td>
              <td className={styles.hash}>{file.expectedHash ?? '—'}</td>
              <td className={styles.hash}>{file.hash ?? '—'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
