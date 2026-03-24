import type { Moment } from "../types/civ";
import { getEraColor, translateEvent } from "../utils/eventTranslator";
import { Grid, type CellComponentProps } from "react-window";

interface Props {
  moments: Moment[];
}

const ITEM_WIDTH = 220;
const LIST_HEIGHT = 300;

export const CivTimeline = ({ moments }: Props) => {
  const sortedMoments = [...moments].sort((a, b) => a.Turn - b.Turn || a.Id - b.Id);

  const MomentCard = ({ columnIndex, style }: CellComponentProps) => {
    const index = columnIndex as number;
    const styleProps = style as React.CSSProperties;
    const moment = sortedMoments[index];
    const { label, icon } = translateEvent(moment.Type);
    const eraColor = getEraColor(moment.GameEra);

    return (
      <div style={{ ...styleProps, padding: '0 10px' }}> 
        <div style={{
          background: 'rgba(30, 30, 30, 0.8)',
          border: `2px solid ${eraColor}`,
          borderRadius: '12px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '15px',
          boxSizing: 'border-box',
          position: 'relative',
          color: 'white',
          textAlign: 'center'
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '-10px',
            width: 'calc(100% + 20px)',
            height: '2px',
            background: eraColor,
            zIndex: 0
          }} />

          <img 
            src={`/assets/moments/${icon}`} 
            alt={moment.Type}
            style={{ 
              width: '80px', 
              height: '80px', 
              zIndex: 1, 
              position: 'relative',
              backgroundColor: '#1e1e1e',
              borderRadius: '50%',
              padding: '5px'
            }}
            onError={(e) => { e.currentTarget.src = '/assets/moments/MOMENT_GENERIC.png'; }}
          />

          <p style={{ fontSize: '0.85rem', margin: '10px 0', flexGrow: 1, zIndex: 1 }}>
            {label}
          </p>

          <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: eraColor, zIndex: 1 }}>
            Turno {moment.Turn} (+{moment.EraScore} Era Score)
          </div>
        </div>
      </div>
    );

  };

  return (
    <div style={{ border: '1px solid #444', borderRadius: '12px', padding: '20px', background: '#111' }}>
      <h3 style={{ color: 'white', marginTop: 0 }}>Línea de Tiempo Histórica</h3>
      
      <div style={{ overflowX: 'auto' }}>
        <Grid
          cellComponent={MomentCard}
          cellProps={{}}
          columnCount={sortedMoments.length}
          rowCount={1}
          columnWidth={ITEM_WIDTH}
          rowHeight={LIST_HEIGHT}
          style={{ overflowY: 'hidden', width: '100%', height: LIST_HEIGHT }}
        />
      </div>
    </div>
  );
};