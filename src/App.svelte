<script lang="ts">
  import GenerationSection from './components/GenerationSection.svelte';
  import Tabs from './components/Tabs.svelte';
  import ValidationSection from './components/ValidationSection.svelte';
  import './App.css';
  import { TabNames } from './constants/tabs';

  let activeTab = $state<(typeof TabNames)[keyof typeof TabNames]>(TabNames.GENERATION);
</script>

<div class="container">
  <h1>📐 Sha256nnel: Генерация и проверка хэшей</h1>
  <Tabs bind:activeTab />

  {#if activeTab === TabNames.GENERATION}
    <GenerationSection />
  {:else if activeTab === TabNames.VALIDATION}
    <ValidationSection />
  {/if}

  <a href="https://github.com/AlexNemtsev/Sha256nnel" target="_blank"> GitHub </a>
</div>
