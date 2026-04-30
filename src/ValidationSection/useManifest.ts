import { useState } from 'react';
import type { Manifest } from '../types/Manifest';

export const useManifest = () => {
  const [manifestContent, setManifestContent] = useState<Manifest | null>(null);

  const handleManifest = async (files: FileList) => {
    if (files.length > 0) {
      try {
        const text = await files[0].text();
        const manifest = JSON.parse(text) as Manifest;
        setManifestContent(manifest);
      } catch (error) {
        alert(`Произошла ошибка: ${error}`);
        setManifestContent(null);
      }
    }
  };

  return {
    manifestContent,
    handleManifest,
  };
};
