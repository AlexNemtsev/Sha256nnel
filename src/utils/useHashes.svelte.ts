import { sha256 } from './sha256';
import type { FileData } from '../types/FileData';
import type { Manifest } from '../types/Manifest';

const getManifest = async (proceededFiles: FileData[]) => {
  const manifest: Manifest = {
    generated_at: new Date().toISOString(),
    tool: 'Sha256nnel',
    files: proceededFiles,
  };

  const manifestString = JSON.stringify(manifest, null, 2);
  const manifestBlob = new Blob([manifestString], { type: 'application/json' });

  let hash = '';
  let error = '';

  try {
    hash = await sha256(manifestBlob);
  } catch (err) {
    console.error('Ошибка при вычислении хэша:', err);
    error = 'Ошибка при вычислении хэша';
  }

  if (hash) {
    return {
      hash,
      url: URL.createObjectURL(manifestBlob),
      fileName: `manifest_${new Date().toISOString().slice(0, 10)}.json`,
    };
  }

  return {
    error,
  };
};

export const useHashes = () => {
  let isHashing = $state(false);
  let totalFilesCount = $state(0);
  let processedFilesCount = $state(0);
  let proceededFiles = $state<FileData[]>([]);
  let manifest = $state<Awaited<ReturnType<typeof getManifest>>>();

  const handleFiles = async (files: FileList) => {
    isHashing = true;
    totalFilesCount = files.length;
    processedFilesCount = 0;
    proceededFiles = [];

    const filesArray = Array.from(files);
    let completedCount = 0;

    const hashPromises = filesArray.map((file) =>
      sha256(file)
        .then((hash) => {
          completedCount++;
          processedFilesCount = completedCount;
          return { file, hash, error: null };
        })
        .catch((error) => {
          completedCount++;
          processedFilesCount = completedCount;
          return { file, hash: null, error };
        })
    );

    const results = await Promise.all(hashPromises);

    proceededFiles = results.map(({ file, hash, error }) => {
      if (hash) {
        return {
          name: file.name,
          size: file.size,
          hash,
        };
      }

      return {
        name: file.name,
        error: JSON.stringify(error),
      };
    });

    isHashing = false;
    manifest = await getManifest(proceededFiles);
  };

  return {
    get isHashing() {
      return isHashing;
    },
    get totalFilesCount() {
      return totalFilesCount;
    },
    get processedFilesCount() {
      return processedFilesCount;
    },
    get proceededFiles() {
      return proceededFiles;
    },
    get manifest() {
      return manifest;
    },
    handleFiles,
  };
};
