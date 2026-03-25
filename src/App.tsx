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
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 p-4 font-sans">
      <header className="max-w-6xl mx-auto py-8 text-center bg-gradient-to-b from-gray-900 to-transparent rounded-t-3xl border-b border-gray-800 mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 uppercase tracking-widest drop-shadow-sm filter">
          Análisis de Civilization VI
        </h1>
        <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto font-light">Explora las líneas de tiempo históricas y los detalles de cada civilización</p>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10 bg-gray-900/50 p-6 rounded-2xl border border-gray-800/60 shadow-lg">
          <label htmlFor="file-select" className="text-lg font-semibold text-amber-500 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Selecciona una partida:
          </label>
          <div className="relative">
            <select
              id="file-select"
              value={selectedFile}
              onChange={(e) => setSelectedFile(e.target.value)}
              className="appearance-none bg-gray-800 border border-gray-700 text-white rounded-lg px-6 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-medium min-w-[250px] shadow-inner cursor-pointer"
            >
              {availableFiles.map(file => (
                <option key={file} value={file}>{file.replace('.json', '')} - Partida Histórica</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-amber-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>
        </div>

        <GameDashboard filename={selectedFile} />
      </main>
      
      <footer className="mt-16 py-6 text-center text-gray-600 text-sm border-t border-gray-900">
        <p>Civilization VI Data Dashboard &copy; 2026</p>
      </footer>
    </div>
  );
}

export default App;
