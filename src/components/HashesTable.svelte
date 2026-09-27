<script lang="ts">
  import type { FileData } from '../types/FileData';

  interface HashesTableProps {
    filesData: FileData[];
  }

  let { filesData }: HashesTableProps = $props();
</script>

<table>
  <thead>
    <tr>
      <th>Файл</th>
      <th>Размер</th>
      <th>SHA-256</th>
    </tr>
  </thead>
  <tbody>
    {#each filesData as fileData (fileData.name)}
      {#if fileData.error}
        <tr>
          <td>{fileData.name}</td>
          <td>Ошибка</td>
          <td class="hash">⚠️ ${fileData.error}</td>
        </tr>
      {:else}
        <tr>
          <td>{fileData.name}</td>
          <td>{fileData.size}</td>
          <td class="hash">{fileData.hash}</td>
        </tr>
      {/if}
    {/each}
  </tbody>
</table>

<style>
  .hash {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    word-break: break-all;
    font-size: 0.85rem;
  }
</style>
