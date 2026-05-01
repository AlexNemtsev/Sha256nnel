import { useState } from 'react';
import type { Manifest } from '../types/Manifest';
import { sha256 } from '../common/utils/sha256';

export const useManifest = () => {
  const [manifestContent, setManifestContent] = useState<Manifest | null>(null);
  const [manifestHash, setManifestHash] = useState('');

  const handleManifest = async (files: FileList) => {
    if (files.length > 0) {
      try {
        const text = await files[0].text();
        const manifest = JSON.parse(text) as Manifest;
        setManifestContent(manifest);

        const hash = await sha256(files[0]);
        setManifestHash(hash);
      } catch (error) {
        alert(`Произошла ошибка: ${error}`);
        setManifestContent(null);
      }
    }
  };

  return {
    manifestContent,
    handleManifest,
    manifestHash,
  };
};
