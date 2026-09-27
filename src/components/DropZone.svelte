<script lang="ts">
  interface DropZoneProps {
    dropLabel: string;
    buttonLabel?: string;
    accept?: string;
    multiple?: boolean;
    id: string;
    onDrop: (files: FileList) => Promise<void>;
  }

  let { dropLabel, onDrop, buttonLabel, accept, multiple, id }: DropZoneProps = $props();

  let isDragging = $state(false);

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    isDragging = true;
  }

  function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    isDragging = false;
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    isDragging = false;
    if (e.dataTransfer?.files) {
      onDrop(e.dataTransfer.files);
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      document.getElementById(id)?.click();
    }
  }

  function handleInputChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      onDrop(target.files);
    }
  }
</script>

<div
  class="drop-zone"
  class:dragOver={isDragging}
  role="button"
  tabindex="0"
  ondragover={handleDragOver}
  ondragleave={handleDragLeave}
  ondrop={handleDrop}
  onkeydown={handleKeydown}
>
  <div class="input-container">
    <p>{dropLabel}</p>
    <label class="button" for={id}>
      {buttonLabel ?? 'Выбрать файлы'}
    </label>
  </div>
  <input type="file" {id} class="hidden-input" {accept} {multiple} onchange={handleInputChange} />
</div>

<style>
  .drop-zone {
    border: 2px dashed #adb5bd;
    padding: 2rem;
    text-align: center;
    border-radius: 8px;
    margin-bottom: 1rem;
    transition: 0.2s;
  }

  .dragOver {
    background: #e7f1ff;
    border-color: #0d6efd;
  }

  .button {
    padding: 0.5rem 1rem;
    background: #0d6efd;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      background: #0b5ed7;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .input-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    /* flex-direction: column; */
  }

  .hidden-input {
    opacity: 0;
    height: 0;
    position: absolute;
  }
</style>
