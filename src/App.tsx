import { useState } from 'react';
import { GameDashboard } from './components/GameDashboard';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState<string>('Alexander.json');

  const availableFiles = [
    'Pachacuti.json',
    'Teddy Roosevelt.json',
    'Seondeok.json',
    'Alexander.json'
  ];

  return (
    <div className="App">
      <h1>Análisis de Civilization VI</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <label htmlFor="file-select">Selecciona una partida: </label>
        <select 
          id="file-select" 
          value={selectedFile} 
          onChange={(e) => setSelectedFile(e.target.value)}
        >
          {availableFiles.map(file => (
            <option key={file} value={file}>{file}</option>
          ))}
        </select>
      </div>

      <GameDashboard filename={selectedFile} />
    </div>
  );
}

export default App;