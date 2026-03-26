import { useState } from "react"
import { CivTimeline } from "./CivTimeline"
import type { CivGameData } from "../types/civ"

import { DashboardHeader } from "./dashboard/DashboardHeader"
import { DashboardStats } from "./dashboard/DashboardStats"
import { DashboardOpponents } from "./dashboard/DashboardOpponents"

interface Props {
    data: CivGameData
}

export const GameDashboard = ({ data }: Props) => {
    const [showLeaders, setShowLeaders] = useState<boolean>(false)
    const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null)
    
    if (!data) return <p className="text-gray-400 text-center p-4">No hay datos disponibles.</p>
    if (!data.Moments || data.Moments.length === 0) return <p className="text-gray-400 text-center p-4">No hay momentos históricos en los datos.</p>
    if (!data.Players || data.Players.length === 0) return <p className="text-gray-400 text-center p-4">No hay jugadores en los datos.</p>
    
    const humanPlayer = data.Players[0]
    const activePlayerId = selectedPlayerId ?? humanPlayer.Id
    const activePlayer = data.Players.find(p => p.Id === activePlayerId) || humanPlayer
    
    const totalTurns = data.Moments.length > 0 ? data.Moments[data.Moments.length - 1].Turn : 0;
    
    const activePlayerMoments = data.Moments.filter(m => m.ActingPlayer === activePlayerId)
    const totalEraScore = activePlayerMoments.reduce((acc, moment) => acc + moment.EraScore, 0)
    
    const opponents = data.Players.filter(player =>
      player.Id !== humanPlayer.Id &&
      !player.Civilization.includes("BARBARIAN") &&
      !player.LeaderType.includes("MINOR") &&
      !player.LeaderType.includes("LEADER_FREE_CITIES")
    )

    return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6 text-white shadow-xl max-w-6xl mx-auto">
      <DashboardHeader humanPlayer={humanPlayer} />

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

      <DashboardStats 
        activePlayer={activePlayer} 
        activePlayerMoments={activePlayerMoments} 
      />

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setShowLeaders(!showLeaders)}
          className="bg-blue-600 hover:bg-blue-500 transition-colors text-white py-2 px-4 rounded-lg font-medium shadow"
        >
          {showLeaders ? "Ocultar Líderes Enfrentados" : "Ver Líderes Enfrentados"}
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
        <DashboardOpponents 
          opponents={opponents} 
          activePlayerId={activePlayerId} 
          setSelectedPlayerId={setSelectedPlayerId} 
        />
      )}

      <div className="mt-8 border-t border-gray-800 pt-8">
        <div className="flex items-center gap-3 mb-6">
          <img
             src={`/assets/leaders/${activePlayer.LeaderName}.webp`}
             alt={activePlayer.LeaderName}
             className="w-12 h-12 object-cover rounded-full"
             onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/48?text=?"; }}
          />
          <h3 className="text-xl text-white font-bold">Línea de Tiempo: {activePlayer.LeaderName}</h3>
        </div>
        <CivTimeline moments={activePlayerMoments} />
      </div>
    </div>
  );
}