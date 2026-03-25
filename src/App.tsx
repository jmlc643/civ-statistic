import { useState } from "react";
import { GameDashboard } from "./components/GameDashboard";
import type { CivGameData } from "./types/civ";
import "./App.css";

function App() {
  const [gameData, setGameData] = useState<CivGameData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string) as CivGameData;
        
        if (!json.Players || !json.Moments) {
          throw new Error("El archivo JSON no tiene el formato de partida de Civilization VI.");
        }

        setGameData(json);
        setError(null);
      } catch (err) {
        setGameData(null);
        setError((err as Error).message || "Error al procesar el archivo.");
      }
    };
    reader.readAsText(file);
  };

  const loadExample = async (filename: string) => {
    try {
      const response = await fetch(`/data/${filename}`);
      const json = await response.json();
      setGameData(json);
      setError(null);
    } catch {
      setError("Error al cargar la partida de ejemplo");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 p-4 font-sans flex flex-col">
      <header className="max-w-6xl mx-auto py-8 text-center bg-linear-to-b from-gray-900 to-transparent rounded-t-3xl border-b border-gray-800 mb-8 w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-yellow-200 to-amber-500 uppercase tracking-widest drop-shadow-sm filter">
          Análisis de Civilization VI
        </h1>
        <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto font-light">Explora las líneas de tiempo históricas y los detalles de cada civilización</p>
      </header>

      <main className="max-w-6xl mx-auto grow w-full flex flex-col">
        {!gameData ? (
          <div className="grow flex flex-col items-center justify-center p-6 mt-12 mb-12">
            {error && <div className="mb-6 p-4 bg-red-900/50 border border-red-500 text-red-200 rounded-lg max-w-2xl w-full text-center">{error}</div>}
            
            <div className="w-full max-w-2xl bg-gray-900/40 border-2 border-dashed border-amber-600/50 rounded-2xl p-16 text-center hover:bg-gray-900/60 transition-all shadow-2xl relative group">
              <input 
                type="file" 
                accept=".json" 
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center gap-6">
                 <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-amber-500 group-hover:scale-110 transition-transform" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <h2 className="text-3xl font-bold text-gray-100">Sube tu partida</h2>
                <p className="text-gray-400 text-lg">Arrastra tu archivo <span className="font-mono text-amber-500">.json</span> aquí o haz clic para buscarlo</p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <p className="text-gray-500 mb-6">¿No tienes un archivo a la mano? Prueba con un ejemplo:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {["Alexander.json", "Pachacuti.json", "Teddy Roosevelt.json", "Seondeok.json"].map(file => (
                  <button 
                    key={file}
                    onClick={() => loadExample(file)}
                    className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-amber-500 transition-all text-sm py-2 px-5 rounded-full text-gray-300"
                  >
                    {file.replace(".json", "")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className="mb-6 flex justify-center">
              <button 
                onClick={() => setGameData(null)}
                className="flex items-center gap-2 text-amber-500 hover:text-amber-400 hover:bg-gray-900 border border-gray-800 px-4 py-2 rounded-lg transition-colors"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                Cargar otra partida
              </button>
            </div>
            <GameDashboard data={gameData} />
          </div>
        )}
      </main>
      
      <footer className="mt-auto pt-16 pb-6 text-center text-gray-600 text-sm border-t border-gray-900">
        <p>Civilization VI Data Dashboard &copy; 2026</p>
      </footer>
    </div>
  );
}
export default App;
