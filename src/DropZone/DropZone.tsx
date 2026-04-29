import { clsx } from 'clsx';
import { useState } from 'react';

import styles from './DropZone.module.css';

interface DropZoneProps {
  dropLabel: string;
  onDrop: (files: FileList) => void;
}

export const DropZone = (props: DropZoneProps) => {
  const { dropLabel, onDrop } = props;

  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      className={clsx([styles.dropZone, isDragging && styles.dragOver])}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        onDrop(e.dataTransfer.files);
      }}
    >
      <div className={styles.inputContainer}>
        <p>{dropLabel}</p>
        <label className={styles.button} htmlFor="fileInput">
          Выбрать файлы
        </label>
      </div>
      <input
        type="file"
        id="fileInput"
        className={styles.hiddenInput}
        multiple
        accept="image/*,video/*"
        onChange={(e) => {
          const { files } = e.target;
          if (files) {
            onDrop(files);
          }
        }}
      />
    </div>
  );
};
