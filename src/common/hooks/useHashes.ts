import { useState } from 'react';
import type { FileData } from '../../HashesTable';
import { sha256 } from '../utils/sha256';

export const useHashes = () => {
  const [isHashing, setIsHashing] = useState(false);
  const [totalFilesCount, setTotalFilesCount] = useState(0);
  const [currentFile, setCurrentFile] = useState(0);
  const [proceededFiles, setProceededFiles] = useState<FileData[]>([]);

  const handleFiles = async (files: FileList) => {
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

    return processedResults;
  };

  return {
    isHashing,
    totalFilesCount,
    currentFile,
    proceededFiles,
    handleFiles,
  };
};
