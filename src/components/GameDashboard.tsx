import { useState } from "react"
import { useCivData } from "../hooks/useCivData"
import { CivTimeline } from "./CivTimeline"

interface Props {
    filename: string
}

export const GameDashboard = ({ filename }: Props) => {
    const { data, loading, error } = useCivData(filename)
    const [showLeaders, setShowLeaders] = useState<boolean>(false)
    const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null)

    if (loading) return <div className="flex justify-center items-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>
    if (error) return <p className="text-red-500 text-center font-bold p-4 bg-red-100 rounded">Error: {error}</p>
    if (!data) return <p className="text-gray-400 text-center p-4">No hay datos disponibles.</p>

    if (!data.Moments || data.Moments.length === 0) return <p className="text-gray-400 text-center p-4">No hay momentos históricos en los datos.</p>
    if (!data.Players || data.Players.length === 0) return <p className="text-gray-400 text-center p-4">No hay jugadores en los datos.</p>

    const humanPlayer = data.Players[0]
    const activePlayerId = selectedPlayerId ?? humanPlayer.Id
    const activePlayer = data.Players.find(p => p.Id === activePlayerId) || humanPlayer

    const totalTurns = data.Moments.length > 0 ? data.Moments[data.Moments.length - 1].Turn : 0;
    
    // Calculate total Era Score specifically for the active player!
    const activePlayerMoments = data.Moments.filter(m => m.ActingPlayer === activePlayerId)
    const totalEraScore = activePlayerMoments.reduce((acc, moment) => acc + moment.EraScore, 0)

    const opponents = data.Players.filter(player => 
      player.Id !== humanPlayer.Id && 
      !player.Civilization.includes('BARBARIAN') &&
      !player.LeaderType.includes('MINOR') &&
      !player.LeaderType.includes('LEADER_FREE_CITIES')
    )

    return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6 text-white shadow-xl max-w-6xl mx-auto">
      <div className="flex items-center gap-4 border-b border-gray-800 pb-4 mb-6">
        <img 
          src={`/assets/leaders/${humanPlayer.LeaderName}.webp`} 
          alt={humanPlayer.LeaderName} 
          className="w-20 h-20 object-cover rounded-full border-2 border-amber-500 bg-gray-800"
          onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/80?text=?'; }}
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Partida de: {humanPlayer.LeaderName}</h2>
          <p className="text-gray-400">{humanPlayer.CivilizationShortDescription}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-400">Turnos Jugados</div>
          <div className="text-3xl font-bold text-amber-500">{totalTurns}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-400">Puntaje de Era ({activePlayer.LeaderName})</div>
          <div className="text-3xl font-bold text-amber-500">{totalEraScore}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-400">Jugadores/IAs</div>
          <div className="text-3xl font-bold text-amber-500">{data.Players.length}</div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => setShowLeaders(!showLeaders)}
          className="bg-blue-600 hover:bg-blue-500 transition-colors text-white py-2 px-4 rounded-lg font-medium shadow"
        >
          {showLeaders ? 'Ocultar Líderes Enfrentados' : 'Ver Líderes Enfrentados'}
        </button>
        
        {selectedPlayerId !== null && selectedPlayerId !== humanPlayer.Id && (
          <button 
            onClick={() => setSelectedPlayerId(humanPlayer.Id)}
            className="text-amber-500 hover:text-amber-400 transition-colors font-medium border border-amber-500 hover:bg-amber-500/10 py-2 px-4 rounded-lg"
          >
            Volver a tu línea de tiempo
          </button>
        )}
      </div>

      {showLeaders && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          {opponents.map(opp => (
            <div 
              key={opp.Id} 
              onClick={() => setSelectedPlayerId(opp.Id)}
              className={`text-center bg-gray-800 p-4 rounded-xl cursor-pointer transition-all ${activePlayerId === opp.Id ? 'ring-2 ring-amber-500 transform scale-105' : 'hover:bg-gray-700'}`}
            >
              <img 
                src={`/assets/leaders/${opp.LeaderName}.webp`} 
                alt={opp.LeaderName} 
                className="w-16 h-16 object-cover rounded-full mx-auto mb-3 bg-gray-900 shadow-inner"
                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/80?text=?'; }}
              />
              <div className="font-semibold text-sm truncate" title={opp.LeaderName}>{opp.LeaderName}</div>
              <div className="text-xs text-gray-400 truncate" title={opp.CivilizationShortDescription}>{opp.CivilizationShortDescription}</div>
              <div className="mt-2">
                <button className="text-xs bg-gray-900 border border-gray-700 px-2 py-1 rounded text-gray-300">Ver eventos</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 border-t border-gray-800 pt-8">
        <div className="flex items-center gap-3 mb-6">
          <img 
             src={`/assets/leaders/${activePlayer.LeaderName}.webp`} 
             alt={activePlayer.LeaderName} 
             className="w-12 h-12 object-cover rounded-full"
             onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/48?text=?'; }}
          />
          <h3 className="text-xl text-white font-bold">Línea de Tiempo: {activePlayer.LeaderName}</h3>
        </div>
        <CivTimeline moments={activePlayerMoments} />
      </div>
    </div>
  );
}