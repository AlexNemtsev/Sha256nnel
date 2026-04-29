import styles from './ProgressCounter.module.css';

interface ProgressCounterProps {
  total?: number;
  current?: number;
}

export const ProgressCounter = (props: ProgressCounterProps) => {
  const { total, current } = props;

  return (
    <div className={styles.progress} id="progGen">
      ⏳ Обработано файлов:{' '}
      <span id="progTextGen">
        {current}/{total}
      </span>
    </div>
  );
};
