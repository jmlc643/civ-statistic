import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import type { Player, Moment } from '../../types/civ'
import {
  getEraScoreTrend,
  getSettlementBiomes,
  getGovernorStats,
  getMilitaryActivity,
  getCuriosities
} from "../../utils/statsCalculator"

interface Props {
  activePlayer: Player;
  activePlayerMoments: Moment[];
}

export const DashboardStats = ({ activePlayer, activePlayerMoments }: Props) => {
  const eraScoreTrend = getEraScoreTrend(activePlayerMoments)
  const biomes = getSettlementBiomes(activePlayerMoments)
  const governorStats = getGovernorStats(activePlayerMoments)
  const militaryStats = getMilitaryActivity(activePlayerMoments)
  const curiosities = getCuriosities(activePlayerMoments)

  const biomesData = [
    { name: 'Desierto', cantidad: biomes.desert },
    { name: 'Tundra', cantidad: biomes.tundra },
    { name: 'Costa', cantidad: biomes.coast },
    { name: 'Nuevo Continente', cantidad: biomes.newContinent }
  ];

  return (
    <div className="mb-8 border-b border-gray-800 pb-8">
      <h3 className="text-xl text-white font-bold mb-4">Estadísticas Detalladas de {activePlayer.LeaderName}</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Gráfico de tendencias de puntaje de era */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-md text-amber-500 font-semibold mb-4 text-center">Progresión de Puntaje de Era</h4>
          <div className="h-64 w-full">
            {eraScoreTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={eraScoreTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="turn" stroke="#9CA3AF" tick={{fill: '#9CA3AF'}} />
                  <YAxis stroke="#9CA3AF" tick={{fill: '#9CA3AF'}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#fff' }}
                    labelStyle={{ color: '#9CA3AF' }}
                  />
                  <Line type="monotone" dataKey="totalScore" stroke="#F59E0B" strokeWidth={3} dot={false} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 text-sm">Sin datos para graficar</div>
            )}
          </div>
        </div>

        {/* Gráfico de asentamientos por bioma */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-md text-emerald-500 font-semibold mb-4 text-center">Asentamientos por Bioma</h4>
          <div className="h-64 w-full">
            {biomesData.some(d => d.cantidad > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={biomesData} layout="vertical" margin={{ left: 50, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
                  <XAxis type="number" stroke="#9CA3AF" tick={{fill: '#9CA3AF'}} allowDecimals={false} />
                  <YAxis type="category" dataKey="name" stroke="#9CA3AF" tick={{fill: '#9CA3AF'}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#fff' }}
                    cursor={{fill: '#374151'}}
                  />
                  <Bar dataKey="cantidad" fill="#10B981" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 text-sm">Sin asentamientos registrados en biomas clave</div>
            )}
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
          <h4 className="text-blue-500 font-bold mb-2">Actividad Militar</h4>
          <ul className="text-sm space-y-1 text-gray-300">
            <li><span className="text-gray-500">Batallas Libradas:</span> {militaryStats.battles}</li>
            <li><span className="text-gray-500">Unidades de Élite:</span> {militaryStats.eliteUnits}</li>
            <li><span className="text-gray-500">Civs/Líderes Conocidos:</span> {militaryStats.knownCivs}</li>
          </ul>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-purple-500">
          <h4 className="text-purple-500 font-bold mb-2">Gobernadores</h4>
          <ul className="text-sm space-y-1 text-gray-300">
            <li className="truncate" title={governorStats.firstAppointed || "Ninguno"}>
              <span className="text-gray-500">1° Nombrado:</span> {governorStats.firstAppointed || "Ninguno"}
            </li>
            <li className="truncate" title={governorStats.firstFullyPromoted || "Ninguno"}>
              <span className="text-gray-500">1° Máximo Nivel:</span> {governorStats.firstFullyPromoted || "Ninguno"}
            </li>
          </ul>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-rose-500">
          <h4 className="text-rose-500 font-bold mb-2">Curiosidades</h4>
          <ul className="text-sm space-y-1 text-gray-300">
            <li><span className="text-gray-500">Maravillas Construidas:</span> {curiosities.wondersBuilt}</li>
            <li><span className="text-gray-500">Aldeas Tribales:</span> {curiosities.tribalVillages}</li>
            <li>
              <span className="text-gray-500">Turno Circunnavegación:</span> {curiosities.circumnavigationTurn ? `${curiosities.circumnavigationTurn}` : "No lograda"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
