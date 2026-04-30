import { clsx } from 'clsx';
import { useState } from 'react';

import styles from './DropZone.module.css';

interface DropZoneProps {
  dropLabel: string;
  buttonLabel?: string;
  accept?: string;
  multiple?: boolean;
  id?: string;
  onDrop: (files: FileList) => void;
}

export const DropZone = (props: DropZoneProps) => {
  const { dropLabel, onDrop, buttonLabel, accept, multiple, id } = props;

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
        <label className={styles.button} htmlFor={id}>
          {buttonLabel ?? 'Выбрать файлы'}
        </label>
      </div>
      <input
        type="file"
        id={id}
        className={styles.hiddenInput}
        multiple={multiple}
        accept={accept}
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
