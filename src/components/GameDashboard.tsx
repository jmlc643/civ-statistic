import { useState } from "react"
import { useCivData } from "../hooks/useCivData"
import { CivTimeline } from "./CivTimeline"

interface Props {
    filename: string
}

export const GameDashboard = ({ filename }: Props) => {
    const { data, loading, error } = useCivData(filename)
    const [showLeaders, setShowLeaders] = useState<boolean>(false)

    if (loading) return <p>Cargando datos...</p>
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>
    if (!data) return <p>No hay datos disponibles.</p>

    if (!data.Moments || data.Moments.length === 0) return <p>No hay momentos históricos en los datos.</p>
    if (!data.Players || data.Players.length === 0) return <p>No hay jugadores en los datos.</p>

    const humanPlayer = data.Players[0]
    const totalTurns = data.Moments.length > 0 ? data.Moments[data.Moments.length - 1].Turn : 0;
    const totalEraScore = data.Moments.reduce((acc, moment) => acc + moment.EraScore, 0)

    const opponents = data.Players.filter(player => 
      player.Id !== humanPlayer.Id && 
      !player.Civilization.includes('BARBARIAN') &&
      !player.LeaderType.includes('MINOR') &&
      !player.LeaderType.includes('LEADER_FREE_CITIES')
    )

    return (
    <div style={{ border: '1px solid #ccc', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem', background: '#1e1e1e', color: 'white' }}>
      <h2>Partida de: {humanPlayer.LeaderName} ({humanPlayer.CivilizationShortDescription})</h2>

      <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem' }}>
        <div><strong>Turnos Jugados:</strong> {totalTurns}</div>
        <div><strong>Puntaje de Era Acumulado:</strong> {totalEraScore}</div>
        <div><strong>Jugadores/IAs:</strong> {data.Players.length}</div>
      </div>
      
      {/* Botón para alternar la lista */}
      <button 
        onClick={() => setShowLeaders(!showLeaders)}
        style={{ padding: '0.5rem 1rem', cursor: 'pointer', marginBottom: '1rem', background: '#646cff', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        {showLeaders ? 'Ocultar Líderes Enfrentados' : 'Ver Líderes Enfrentados'}
      </button>

      {/* Lista de líderes */}
      {showLeaders && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {opponents.map(opp => (
            <div key={opp.Id} style={{ textAlign: 'center', background: '#2a2a2a', padding: '1rem', borderRadius: '8px' }}>
              <img 
                src={`/assets/leaders/${opp.LeaderName}.webp`} 
                alt={opp.LeaderName} 
                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%', marginBottom: '0.5rem', backgroundColor: '#444' }}
                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/80?text=?'; }}
              />
              <div style={{ fontWeight: 'bold' }}>{opp.LeaderName}</div>
              <div style={{ fontSize: '0.8rem', color: '#aaa' }}>{opp.CivilizationShortDescription}</div>
            </div>
          ))}
        </div>
      )}

      <hr style={{ borderColor: '#444' }} />

      <CivTimeline moments={data.Moments} />
    </div>
  );
}