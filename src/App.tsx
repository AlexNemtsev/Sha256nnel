import { useState } from 'react';
import './App.css';
import { GenerationSection } from './GenerationSection';
import { Tabs } from './Tabs';
import { ValidationSection } from './ValidationSection';
import { TabNames } from './common/constants/tabs';

const App = () => {
  const [activeTab, setActiveTab] = useState<(typeof TabNames)[keyof typeof TabNames]>(
    TabNames.GENERATION
  );

  return (
    <div className="container">
      <h1>📐 Sha256nnel: Генерация и проверка хэшей</h1>
      <Tabs activeTab={activeTab} onChange={setActiveTab} />
      {activeTab === TabNames.GENERATION && <GenerationSection />}
      {activeTab === TabNames.VALIDATION && <ValidationSection />}
      <a href="https://github.com/AlexNemtsev/Sha256nnel" target="_blank">
        GitHub
      </a>
    </div>
  );
};

export default App;
