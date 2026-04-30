import { useEffect, useState } from 'react';
import { DropZone } from '../DropZone';
import { HashesTable } from '../HashesTable';
import { ProgressCounter } from '../ProgressCounter';
import { useHashes } from '../common/hooks/useHashes';
import type { Manifest } from '../types/Manifest';

import styles from './GenerationSection.module.css';
import { sha256 } from '../common/utils/sha256';

export const GenerationSection = () => {
  const { currentFile, handleFiles, isHashing, proceededFiles, totalFilesCount } = useHashes();
  const [manifestHash, setManifestHash] = useState('');

  // Создаём манифест
  const manifest: Manifest = {
    generated_at: new Date().toISOString(),
    tool: 'Sha256nnel',
    files: proceededFiles,
  };

  // Сериализуем манифест в строку для стабильного сравнения
  const manifestString = JSON.stringify(manifest, null, 2);
  const manifestBlob = new Blob([manifestString], { type: 'application/json' });
  const href = URL.createObjectURL(manifestBlob);
  const fileName = `manifest_${new Date().toISOString().slice(0, 10)}.json`;

  // Пересчитываем хэш манифеста при каждом изменении proceededFiles
  useEffect(() => {
    if (proceededFiles.length === 0) {
      setManifestHash('');
      return;
    }

    const computeManifestHash = async () => {
      try {
        const hash = await sha256(manifestBlob);
        setManifestHash(hash);
      } catch (error) {
        console.error('Failed to compute manifest hash:', error);
        setManifestHash('Ошибка при вычислении хэша');
      }
    };

    computeManifestHash();
  }, [manifestString]); // Зависимость от строки — чтобы пересчитывать при изменении содержимого

  return (
    <div>
      <DropZone
        key="filesForGeneration"
        id="filesForGeneration"
        dropLabel="Перетащите фото/видео сюда или"
        onDrop={handleFiles}
        accept="image/*,video/*"
        multiple
      />
      {(isHashing || proceededFiles.length > 0) && (
        <ProgressCounter current={currentFile} total={totalFilesCount} />
      )}
      {!!proceededFiles.length && !isHashing && (
        <a href={href} download={fileName} className={styles.downloadLink}>
          💾 Скачать манифест (JSON)
        </a>
      )}
      {!!proceededFiles.length && <HashesTable filesData={proceededFiles} />}

      {!isHashing && !!proceededFiles.length && (
        <div id="manifestHashBox" className={styles.hashBox}>
          <span className={styles.hashLabel}>Хэш манифеста: </span>
          <span>{manifestHash}</span>
          <button
            className={styles.copyButton}
            onClick={() => navigator.clipboard.writeText(manifestHash)}
            title="Копировать хэш"
          >
            📋 Копировать
          </button>
        </div>
      )}
    </div>
  );
};
