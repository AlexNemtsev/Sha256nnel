<script lang="ts">
  interface ProgressCounterProps {
    total?: number;
    current?: number;
  }

  let { total, current }: ProgressCounterProps = $props();
</script>

<div class="progress">
  ⏳ Обработано файлов:{' '}
  <span id="progTextGen">
    {current}/{total}
  </span>
</div>

<style>
  .progress {
    margin: 1rem 0;
  }
</style>
