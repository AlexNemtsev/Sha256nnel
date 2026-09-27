<script lang="ts">
  import { compareHashes } from '../utils/compareHashes';
  import type { ValidationResult } from '../types/ValidationResult';
  import DropZone from './DropZone.svelte';
  import ProgressCounter from './ProgressCounter.svelte';
  import { useHashes } from '../utils/useHashes.svelte';
  import ValidationTable from './ValidationTable.svelte';
  import { useManifest } from '../utils/useManifest.svelte';

  const hashes = useHashes();
  const manifest = useManifest();
  let validationResult = $state<ValidationResult[]>();
  let expectedHash = $state<string>();

  const onDropFiles = async (files: FileList) => {
    await hashes.handleFiles(files);
    if (manifest.manifestContent && hashes.proceededFiles.length) {
      const result = compareHashes(manifest.manifestContent, hashes.proceededFiles);
      validationResult = result;
    }
  };
</script>

<div>
  <DropZone
    id="manifest"
    dropLabel="Перетащите проверяемый манифест (JSON) сюда или"
    onDrop={manifest.handleManifest}
    accept=".json"
    buttonLabel="Выбрать файл"
  />

  {#if manifest.manifestContent}
    <p>✅ Манифест загружен. Найдено файлов: {manifest.manifestContent.files.length}</p>
    <p>Хэш манифеста: {manifest.manifestHash}</p>
    <div class="input-group">
      <label for="expectedManifestHash" class="hash-label">
        Ожидаемый хэш манифеста:{' '}
      </label>
      <input
        type="text"
        id="expectedManifestHash"
        placeholder="Вставьте хэш"
        class="hash-input"
        bind:value={expectedHash}
      />

      {#if expectedHash && expectedHash === manifest.manifestHash}
        <p>✅ Хэш сумма манифеста совпадает</p>
      {:else if expectedHash && expectedHash !== manifest.manifestHash}
        <p>⚠️ Хэш сумма манифеста изменена</p>
      {/if}
    </div>

    <DropZone
      id="filesForValidation"
      dropLabel="Перетащите проверяемые файлы сюда или"
      multiple
      onDrop={onDropFiles}
    />
  {/if}

  {#if hashes.isHashing || hashes.proceededFiles.length > 0}
    <ProgressCounter current={hashes.processedFilesCount} total={hashes.totalFilesCount} />
  {/if}

  {#if validationResult?.length}
    <ValidationTable files={validationResult} />
  {/if}
</div>

<style>
  .input-group {
    margin-bottom: 16px;
    max-width: 100%;
  }

  .hash-label {
    margin-bottom: 8px;
    display: block;
  }

  .hash-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-family: monospace;
    font-size: 0.85rem;
  }
</style>
