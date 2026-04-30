import { DropZone } from '../DropZone';
import { HashesTable } from '../HashesTable';
import { ProgressCounter } from '../ProgressCounter';
import { useHashes } from '../common/hooks/useHashes';
import type { Manifest } from '../types/Manifest';

import styles from './GenerationSection.module.css';

export const GenerationSection = () => {
  const { currentFile, handleFiles, isHashing, proceededFiles, totalFilesCount } = useHashes();

  const manifest: Manifest = {
    generated_at: new Date().toISOString(),
    tool: 'Sha256nnel',
    files: proceededFiles,
  };
  const manifestBlob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
  const href = URL.createObjectURL(manifestBlob);
  const fileName = `manifest_${new Date().toISOString().slice(0, 10)}.json`;

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
