import { useCivData } from "../hooks/useCivData"

interface Props {
    filename: string
}

export const GameDashboard = ({ filename }: Props) => {
    const { data, loading, error } = useCivData(filename)

    if (loading) return <p>Cargando datos...</p>
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>
      if (!data) return <p>No hay datos disponibles.</p>

      if (!data.Moments || data.Moments.length === 0) return <p>No hay momentos históricos en los datos.</p>
      if (!data.Players || data.Players.length === 0) return <p>No hay jugadores en los datos.</p>

    const totalTurns = data.Moments.length > 0 ? data.Moments[data.Moments.length - 1].Turn : 0;
    const totalEraScore = data.Moments.reduce((acc, moment) => acc + moment.EraScore, 0)
    const humanPlayer = data.Players[0]

    return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
      <h2>Partida de: {humanPlayer.LeaderName} ({humanPlayer.CivilizationShortDescription})</h2>
      
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem' }}>
        <div><strong>Turnos Jugados:</strong> {totalTurns}</div>
        <div><strong>Puntaje de Era Acumulado:</strong> {totalEraScore}</div>
        <div><strong>Jugadores/IAs:</strong> {data.Players.length}</div>
      </div>

      <h3>Últimos 5 Momentos Históricos</h3>
      <ul>
          {data.Moments.slice(-5).map((moment, idx) => (
            <li key={`${moment.Id ?? moment.Turn}-${idx}`}>
            <strong>Turno {moment.Turn} ({moment.GameEra}):</strong> {moment.InstanceDescription}
          </li>
        ))}
      </ul>
    </div>
  );
}