import type { FileData } from '../../types/FileData';
import type { Manifest } from '../../types/Manifest';
import type { ValidationResult } from '../../types/ValidationResult';

export const compareHashes = (manifest: Manifest, files: FileData[]): ValidationResult[] => {
  const result: ValidationResult[] = [];
  const manifestMap = new Map(manifest.files.map((file) => [file.name, file.hash]));

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
