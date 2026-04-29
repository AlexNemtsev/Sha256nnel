import { clsx } from 'clsx';
import { TabNames } from '../common/constants/tabs';

import styles from './Tabs.module.css';

interface TabsProps {
  activeTab: (typeof TabNames)[keyof typeof TabNames];
  onChange: (tab: (typeof TabNames)[keyof typeof TabNames]) => void;
}

export const Tabs = (props: TabsProps) => {
  const { activeTab, onChange } = props;

  return (
    <div className={styles.tabs}>
      <button
        className={clsx(styles.tab, activeTab === TabNames.GENERATION && styles.active)}
        onClick={() => onChange(TabNames.GENERATION)}
      >
        🔨 Генерация
      </button>
      <button
        className={clsx(styles.tab, activeTab === TabNames.VALIDATION && styles.active)}
        onClick={() => onChange(TabNames.VALIDATION)}
      >
        ✅ Проверка
      </button>
    </div>
  );
};
