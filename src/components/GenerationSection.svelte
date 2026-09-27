<script lang="ts">
  import { useHashes } from './useHashes.svelte';
  import DropZone from './DropZone.svelte';
  import ProgressCounter from './ProgressCounter.svelte';
  import HashesTable from './HashesTable.svelte';

  const hashes = useHashes();
</script>

<div>
  <DropZone
    id="filesForGeneration"
    dropLabel="Перетащите фото/видео сюда или"
    multiple
    onDrop={hashes.handleFiles}
  />

  {#if hashes.isHashing || hashes.proceededFiles.length > 0}
    <ProgressCounter current={hashes.processedFilesCount} total={hashes.totalFilesCount} />
  {/if}

  {#if hashes.manifest?.url}
    <a href={hashes.manifest.url} download={hashes.manifest.fileName} class="download-link">
      💾 Скачать манифест (JSON)
    </a>
  {/if}

  {#if !!hashes.proceededFiles.length}
    <HashesTable filesData={hashes.proceededFiles} />
  {/if}

  {#if hashes.manifest}
    <div id="manifestHashBox" class="hash-box">
      <span class="hash-label">Хэш манифеста: </span>
      <span>{hashes.manifest.hash ?? hashes.manifest.error}</span>

      {#if hashes.manifest.hash}
        <button
          class="copy-button"
          onclick={() => navigator.clipboard.writeText(hashes.manifest?.hash ?? '')}
          title="Копировать хэш"
        >
          📋 Копировать
        </button>
      {/if}
    </div>
  {/if}
</div>

<style>
  .download-link {
    padding: 0.5rem 1rem;
    background: #0d6efd;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    text-decoration: none;

    &:hover {
      background: #0b5ed7;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .hash-box {
    background: #f0f7ff;
    border: 1px solid #0d6efd;
    border-radius: 10px;
    padding: 12px;
    margin: 12px 0;
    word-break: break-all;
    font-family: ui-monospace, monospace;
    font-size: 0.85rem;
    position: relative;
  }

  .hash-label {
    font-weight: 600;
    color: #0d6efd;
    display: block;
    margin-bottom: 4px;
  }

  .copy-button {
    position: absolute;
    top: 8px;
    right: 8px;
    background: #0d6efd;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 4px 8px;
    font-size: 0.75rem;
    cursor: pointer;
  }
</style>
