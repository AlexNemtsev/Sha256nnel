import { DropZone } from '../DropZone';
import { ProgressCounter } from '../ProgressCounter';

export const ValidationSection = () => {
  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          📄 Загрузите манифест (JSON): <input type="file" id="manifestFile" accept=".json" />
        </label>
      </div>
      <DropZone
        dropLabel="Перетащите проверяемые файлы сюда или"
        onDrop={(files) => {
          console.log(files);
        }}
      />
      <ProgressCounter />
      <table id="verTable" className="hidden">
        <thead>
          <tr>
            <th>Файл</th>
            <th>Статус</th>
            <th>Ожидаемый хэш</th>
            <th>Фактический хэш</th>
          </tr>
        </thead>
        <tbody id="verBody"></tbody>
      </table>
    </div>
  );
};
