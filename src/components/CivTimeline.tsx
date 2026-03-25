import type { Moment } from "../types/civ";
import { getEraColor, translateEvent } from "../utils/eventTranslator";
import { Grid, type CellComponentProps } from "react-window";

interface Props {
  moments: Moment[];
}

const ITEM_WIDTH = 280;
const LIST_HEIGHT = 380;

export const CivTimeline = ({ moments }: Props) => {
  const sortedMoments = [...moments].sort((a, b) => a.Turn - b.Turn || a.Id - b.Id);

  const MomentCard = ({ columnIndex, style }: CellComponentProps) => {
    const index = columnIndex as number;
    const styleProps = style as React.CSSProperties;
    const moment = sortedMoments[index];
    const { label, icon } = translateEvent(moment);
    const eraColor = getEraColor(moment.GameEra);
    
    // Check if it is a major moment like golden age, etc. based on EraScore
    const isMajor = moment.EraScore >= 3;

    return (
      <div style={{ ...styleProps, padding: '0 12px' }} className="group"> 
        <div className="relative h-full flex flex-col items-center justify-between p-1 box-border">
          {/* Timeline connecting line */}
          <div 
            className="absolute top-1/2 left-0 w-full h-1 -z-10 group-hover:h-2 transition-all duration-300 shadow-sm"
            style={{ 
              background: eraColor, 
              boxShadow: `0 0 10px ${eraColor}80`
            }} 
          />

          <div 
            className={`flex flex-col items-center h-full w-full justify-between p-5 rounded-xl border z-10 
                       bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 
                       transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-2xl`}
            style={{ 
              borderColor: eraColor,
              boxShadow: `inset 0 0 20px ${eraColor}20, 0 4px 6px -1px rgba(0,0,0,0.5)`
            }}
          >
            {/* Header / Era Score indicator */}
            <div className="flex w-full justify-between items-start mb-2">
              <span className="text-xs font-bold px-2 py-1 bg-black/50 rounded-md border border-gray-700 font-mono text-gray-300">
                Turno {moment.Turn}
              </span>
              <span 
                className={`text-xs font-bold px-2 py-1 rounded-full text-black flex items-center gap-1 shadow-sm`}
                style={{ backgroundColor: eraColor }}
              >
                +{moment.EraScore}
              </span>
            </div>

            {/* Icon */}
            <div className={`relative ${isMajor ? 'p-1' : 'p-0.5'} rounded-full bg-gray-900 flex items-center justify-center`}
                 style={{ border: `2px solid ${eraColor}` }}>
              <img 
                src={`/assets/moments/${icon}`} 
                alt={moment.Type}
                className={`${isMajor ? 'w-24 h-24' : 'w-20 h-20'} object-cover rounded-full filter contrast-125 brightness-110 drop-shadow-md`}
                onError={(e) => { e.currentTarget.src = '/assets/moments/MOMENT_GENERIC.webp'; }}
              />
              <div className="absolute inset-0 rounded-full shadow-inner pointer-events-none" style={{ boxShadow: `inset 0 0 15px ${eraColor}60` }}></div>
            </div>

            {/* Description */}
            <p className="text-sm text-center font-semibold text-gray-100 flex-grow mt-4 items-center flex filter drop-shadow-md">
              {label}
            </p>
            
            {/* Base type subtitle */}
            <p className="text-[10px] text-gray-500 uppercase tracking-wider truncate w-full text-center opacity-0 group-hover:opacity-100 transition-opacity">
              {moment.Type.replace('MOMENT_', '')}
            </p>
          </div>
        </div>
      </div>
    );
  };

  if (sortedMoments.length === 0) {
      return <p className="text-gray-400 italic p-6 text-center border border-dashed border-gray-700 rounded-lg">No hay momentos registrados para este jugador.</p>
  }

  return (
    <div className="bg-gradient-to-b from-gray-950 to-black border border-gray-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-700 via-yellow-500 to-amber-700"></div>
      
      <div className="w-full overflow-x-auto custom-scrollbar pb-4 pt-2">
        <Grid
          cellComponent={MomentCard}
          cellProps={{}}
          columnCount={sortedMoments.length}
          rowCount={1}
          columnWidth={ITEM_WIDTH}
          rowHeight={LIST_HEIGHT}
          style={{ overflowY: 'hidden', width: '100%', height: LIST_HEIGHT + 20 }}
          className="scrollbar-hide"
        />
      </div>
    </div>
  );
};