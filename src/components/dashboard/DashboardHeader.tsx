import type { Player } from '../../types/civ';

interface Props {
  humanPlayer: Player;
}

export const DashboardHeader = ({ humanPlayer }: Props) => {
  return (
    <div className="flex items-center gap-4 border-b border-gray-800 pb-4 mb-6">
      <img
        src={`/assets/leaders/${humanPlayer.LeaderName}.webp`}
        alt={humanPlayer.LeaderName}
        className="w-20 h-20 object-cover rounded-full border-2 border-amber-500 bg-gray-800"
        onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/80?text=?"; }}
      />
      <div>
        <h2 className="text-2xl font-bold text-gray-100">Partida de: {humanPlayer.LeaderName}</h2>
        <p className="text-gray-400">{humanPlayer.CivilizationShortDescription}</p>
      </div>
    </div>
  );
};
