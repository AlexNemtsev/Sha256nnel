import { useState } from 'react';
import { useHashes } from '../common/hooks/useHashes';
import { DropZone } from '../DropZone';
import type { FileData } from '../HashesTable';
import { ProgressCounter } from '../ProgressCounter';
import type { Manifest } from '../types/Manifest';
import { ValidationTable, type ValidationResult } from '../ValidationTable';
import { useManifest } from './useManifest';

const compareHashes = (manifest: Manifest, files: FileData[]): ValidationResult[] => {
  const result: ValidationResult[] = [];
  const manifestMap = new Map(manifest.files.map((file) => [file.name, file.hash]));
  console.log(files);

  files.forEach((file) => {
    if (!manifestMap.has(file.name)) {
      result.push({
        name: file.name,
        status: {
          ok: false,
          message: 'Файл не найден в манифесте',
        },
      });
    } else {
      const isHashValid = manifestMap.get(file.name) === file.hash;
      result.push({
        name: file.name,
        status: {
          ok: isHashValid,
          message: isHashValid ? '✅ Совпадает' : '⚠️ Изменён',
        },
        expectedHash: manifestMap.get(file.name),
        hash: file.hash,
      });
    }
  });

  return result;
};

export const ValidationSection = () => {
  const { currentFile, handleFiles, isHashing, proceededFiles, totalFilesCount } = useHashes();
  const { handleManifest, manifestContent } = useManifest();
  const [validationResult, setValidationResult] = useState<ValidationResult[] | null>(null);

  const onDropFiles = async (files: FileList) => {
    const hashes = await handleFiles(files);
    if (manifestContent) {
      const result = compareHashes(manifestContent, hashes);
      setValidationResult(result);
    }
  };

  console.log(validationResult);

  return (
    <div>
      <DropZone
        key="manifest"
        id="manifest"
        dropLabel="Перетащите проверяемый манифест (JSON) сюда или"
        onDrop={handleManifest}
        accept=".json"
        buttonLabel="Выбрать файл"
      />
      {manifestContent && (
        <p>✅ Манифест загружен. Найдено файлов: {manifestContent.files.length}</p>
      )}
      {manifestContent && (
        <DropZone
          key="filesForValidation"
          id="filesForValidation"
          dropLabel="Перетащите проверяемые файлы сюда или"
          accept="image/*,video/*"
          multiple
          onDrop={onDropFiles}
        />
      )}
      {isHashing ||
        (!!proceededFiles.length && (
          <ProgressCounter current={currentFile} total={totalFilesCount} />
        ))}
      {!!validationResult?.length && <ValidationTable files={validationResult} />}
    </div>
  );
};
