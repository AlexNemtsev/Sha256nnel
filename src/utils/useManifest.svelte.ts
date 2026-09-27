import { sha256 } from './sha256';
import type { Manifest } from '../types/Manifest';

export const useManifest = () => {
  let manifestContent = $state<Manifest | null>(null);
  let manifestHash = $state<string>();

  const handleManifest = async (files: FileList) => {
    if (files.length > 0) {
      try {
        const text = await files[0].text();
        const manifest = JSON.parse(text) as Manifest;
        manifestContent = manifest;

        const hash = await sha256(files[0]);
        manifestHash = hash;
      } catch (error) {
        alert(`Произошла ошибка: ${error}`);
        manifestContent = null;
      }
    }
  };

  return {
    handleManifest,
    get manifestContent() {
      return manifestContent;
    },
    get manifestHash() {
      return manifestHash;
    },
  };
};
