import { useState } from 'react';
import { DropZone } from '../DropZone';
import { HashesTable, type FileData } from '../HashesTable';
import { ProgressCounter } from '../ProgressCounter';
import { sha256 } from '../common/utils/sha256';

import styles from './GenerationSection.module.css';

export const GenerationSection = () => {
  const [isHashing, setIsHashing] = useState(false);
  const [totalFilesCount, setTotalFilesCount] = useState(0);
  const [currentFile, setCurrentFile] = useState(0);
  const [proceededFiles, setProceededFiles] = useState<FileData[]>([]);

  const handleFilesDrop = async (files: FileList) => {
    setIsHashing(true);
    setTotalFilesCount(files.length);
    setCurrentFile(0);
    setProceededFiles([]);

    const filesArray = Array.from(files);
    let completedCount = 0;

    const hashPromises = filesArray.map((file) =>
      sha256(file)
        .then((hash) => {
          completedCount++;
          setCurrentFile(completedCount);
          return { file, hash, error: null };
        })
        .catch((error) => {
          completedCount++;
          setCurrentFile(completedCount);
          return { file, hash: null, error };
        })
    );

    const results = await Promise.all(hashPromises);

    const processedResults: FileData[] = results.map(({ file, hash, error }) => {
      if (hash) {
        return {
          name: file.name,
          size: file.size,
          hash,
        };
      } else {
        return {
          name: file.name,
          error: JSON.stringify(error),
        };
      }
    });

    setProceededFiles(processedResults);
    setIsHashing(false);
  };

  const manifest = {
    generated_at: new Date().toISOString(),
    tool: 'Sha256nnel',
    files: proceededFiles,
  };
  const manifestBlob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
  const href = URL.createObjectURL(manifestBlob);
  const fileName = `manifest_${new Date().toISOString().slice(0, 10)}.json`;

  return (
    <div>
      <DropZone dropLabel="Перетащите фото/видео сюда или" onDrop={handleFilesDrop} />
      {isHashing ||
        (!!proceededFiles.length && (
          <ProgressCounter current={currentFile} total={totalFilesCount} />
        ))}
      {!!proceededFiles.length && !isHashing && (
        <a href={href} download={fileName} className={styles.downloadLink}>
          💾 Скачать манифест (JSON)
        </a>
      )}
      {!!proceededFiles.length && <HashesTable filesData={proceededFiles} />}
    </div>
  );
};
