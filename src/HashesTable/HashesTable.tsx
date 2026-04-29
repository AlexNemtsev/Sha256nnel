import { formatSize } from '../common/utils/formatSize';

import styles from './HashesTable.module.css';

export interface FileData {
  name: string;
  size?: number;
  hash?: string;
  error?: string;
}

interface HashesTableProps {
  filesData: FileData[];
}

export const HashesTable = (props: HashesTableProps) => {
  const { filesData } = props;

  return (
    <table>
      <thead>
        <tr>
          <th>Файл</th>
          <th>Размер</th>
          <th>SHA-256</th>
        </tr>
      </thead>
      <tbody>
        {filesData.map((fileData) => {
          if (fileData.error) {
            return (
              <tr key={fileData.name}>
                <td>${fileData.name}</td>
                <td>Ошибка</td>
                <td className={styles.hash}>⚠️ ${fileData.error}</td>
              </tr>
            );
          }

          return (
            <tr key={fileData.name}>
              <td>{fileData.name}</td>
              <td>{formatSize(fileData.size ?? 0)}</td>
              <td className={styles.hash}>{fileData.hash}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
