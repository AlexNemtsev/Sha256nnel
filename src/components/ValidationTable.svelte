<script lang="ts">
  import type { ValidationResult } from '../types/ValidationResult';

  interface ValidationTableProps {
    files: ValidationResult[];
  }

  let { files }: ValidationTableProps = $props();
</script>

<table>
  <thead>
    <tr>
      <th>Файл</th>
      <th>Статус</th>
      <th>Ожидаемый хэш</th>
      <th>Фактический хэш</th>
    </tr>
  </thead>
  <tbody>
    {#each files as file (file.name)}
      <tr>
        <td>{file.name}</td>
        <td class={file.status.ok ? 'status-ok' : 'status-fail'}>{file.status.message}</td>
        <td class="hash">{file.expectedHash ?? '-'}</td>
        <td class="hash">{file.hash ?? '-'}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .hash {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    word-break: break-all;
    font-size: 0.85rem;
  }

  .status-ok {
    color: #198754;
    font-weight: bold;
  }

  .status-fail {
    color: #dc3545;
    font-weight: bold;
  }
</style>
