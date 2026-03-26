import type { Moment } from "../types/civ";
import { getEraColor, translateEvent } from "../utils/eventTranslator";
import { Grid, type CellComponentProps } from "react-window";
import "./CivTimeline.css";

interface Props {
  moments: Moment[];
}

const ITEM_WIDTH = 300;
const LIST_HEIGHT = 420;

export const CivTimeline = ({ moments }: Props) => {
  const sortedMoments = [...moments].sort((a, b) => a.Turn - b.Turn || a.Id - b.Id);

  const MomentCard = ({ columnIndex, style }: CellComponentProps) => {
    const index = columnIndex as number;
    const styleProps = style as React.CSSProperties;
    const moment = sortedMoments[index];
    const { label, icon } = translateEvent(moment);
    const eraColor = getEraColor(moment.GameEra);

    const isMajor = moment.EraScore >= 3;

    return (
      <div style={{ ...styleProps, padding: "0 16px" }} className="group">
        <div className="relative h-full flex flex-col items-center justify-between p-2 box-border">
          {/* Línea de conexión de la línea de tiempo */}
          <div
            className="absolute top-[40%] left-0 w-full h-1 -z-10 group-hover:h-1.5 transition-all duration-300 shadow-sm"
            style={{
              background: eraColor,
              boxShadow: `0 0 10px ${eraColor}80`
            }}
          />

          <div
            className={`flex flex-col items-center h-[90%] w-full rounded-xl border z-10 
                       bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 
                       transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-2xl overflow-hidden`}
            style={{
              borderColor: eraColor,
              boxShadow: `inset 0 0 20px ${eraColor}20, 0 8px 16px -4px rgba(0,0,0,0.6)`
            }}
          >
            {/* Mitad superior con icono y fondo */}
            <div className="w-full relative grow-[0.4] flex flex-col items-center justify-center pt-4 pb-2" style={{ backgroundColor: `${eraColor}05` }}>
              <div className="absolute top-2 w-full px-3 flex justify-between items-start z-20">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-black/60 rounded border border-gray-700 font-mono text-gray-300 backdrop-blur-sm">
                  Turno {moment.Turn}
                </span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full text-black flex items-center shadow-lg backdrop-blur-md`}
                  style={{ backgroundColor: eraColor }}
                >
                  +{moment.EraScore}
                </span>
              </div>
              
              {/* Iconos */}
              <div className={`relative ${isMajor ? "p-1.5" : "p-1"} rounded-full bg-gray-950 flex items-center justify-center mt-3 z-10 shadow-2xl`}
                   style={{ border: `2px solid ${eraColor}` }}>
                <img
                  src={`/assets/moments/${icon}`}
                  alt={moment.Type}
                  className={`${isMajor ? "w-28 h-28" : "w-24 h-24"} object-cover rounded-full filter contrast-125 brightness-110 drop-shadow-lg`}
                  onError={(e) => { e.currentTarget.src = "/assets/moments/MOMENT_GENERIC.webp"; }}
                />
                <div className="absolute inset-0 rounded-full shadow-inner pointer-events-none" style={{ boxShadow: `inset 0 0 20px ${eraColor}80` }}></div>
              </div>
            </div>
            
            {/* Mitad inferior con texto */}
            <div className="w-full grow-[0.6] flex flex-col items-center justify-start p-4 bg-gray-950/40 relative">
              <div className="absolute top-0 left-0 w-full h-px" style={{
                background: `linear-gradient(90deg, transparent, ${eraColor}50, transparent)`
              }}></div>
              
              <p className="text-[15px] leading-snug text-center font-bold text-gray-100 grow flex items-center filter drop-shadow-md pb-2 mt-2">
                {label}
              </p>

              {/* Subtítulo del tipo base */}
              <div className="h-6 w-full flex items-center justify-center">
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest truncate w-full text-center px-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    {moment.Type.replace("MOMENT_", "").replace(/_/g, " ")}
                  </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (sortedMoments.length === 0) {
      return <p className="text-gray-400 italic p-6 text-center border border-dashed border-gray-700 rounded-lg">No hay momentos registrados para este jugador.</p>;
  }

  return (
    <div className="bg-linear-to-b from-gray-950 to-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-amber-700 via-yellow-500 to-amber-700"></div>
      
      <div className="w-full overflow-hidden pb-2 pt-2">
        <Grid
          cellComponent={MomentCard}
          cellProps={{}}
          columnCount={sortedMoments.length}
          rowCount={1}
          columnWidth={ITEM_WIDTH}
          rowHeight={LIST_HEIGHT}
          style={{ overflowY: "hidden", width: "100%", height: LIST_HEIGHT + 30 }}
          className="civ-timeline-grid"
        />
      </div>
    </div>
  );
};
