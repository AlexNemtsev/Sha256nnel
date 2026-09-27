<script lang="ts">
  import { TabNames } from '../common/constants/tabs';

  interface TabsProps {
    activeTab: (typeof TabNames)[keyof typeof TabNames];
  }

  let { activeTab = $bindable() }: TabsProps = $props();
</script>

<div class="tabs">
  <button
    class="tab"
    class:active={activeTab === TabNames.GENERATION}
    onclick={() => (activeTab = TabNames.GENERATION)}
  >
    🔨 Генерация
  </button>
  <button
    class="tab"
    class:active={activeTab === TabNames.VALIDATION}
    onclick={() => (activeTab = TabNames.VALIDATION)}
  >
    ✅ Проверка
  </button>
</div>

<style>
  .tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .tab {
    padding: 0.5rem 1rem;
    border: none;
    background: #e9ecef;
    border-radius: 6px;
    cursor: pointer;

    &.active {
      background: #0d6efd;
      color: white;
    }
  }
</style>
