import type { Player } from '../../types/civ'

interface Props {
  opponents: Player[];
  activePlayerId: number;
  setSelectedPlayerId: (id: number) => void;
}

export const DashboardOpponents = ({ opponents, activePlayerId, setSelectedPlayerId }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
      {opponents.map(opp => (
        <div
          key={opp.Id} 
          onClick={() => setSelectedPlayerId(opp.Id)}
          className={`text-center bg-gray-800 p-4 rounded-xl cursor-pointer transition-all ${activePlayerId === opp.Id ? "ring-2 ring-amber-500 transform scale-105" : "hover:bg-gray-700"}`}
        >
          <img
            src={`/assets/leaders/${opp.LeaderName}.webp`}
            alt={opp.LeaderName}
            className="w-16 h-16 object-cover rounded-full mx-auto mb-3 bg-gray-900 shadow-inner"
            onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/80?text=?"; }}
          />
          <div className="font-semibold text-sm truncate" title={opp.LeaderName}>{opp.LeaderName}</div>
          <div className="text-xs text-gray-400 truncate" title={opp.CivilizationShortDescription}>{opp.CivilizationShortDescription}</div>
          <div className="mt-2">
            <button className="text-xs bg-gray-900 border border-gray-700 px-2 py-1 rounded text-gray-300">Ver eventos</button>
          </div>
        </div>
      ))}
    </div>
  );
};