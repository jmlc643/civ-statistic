import type { Moment } from '../types/civ';
import type { 
  EraScoreTrend, 
  SettlementBiomes, 
  GovernorStats, 
  MilitaryActivity, 
  Curiosities 
} from '../types/stats';

export const getEraScoreTrend = (moments: Moment[]): EraScoreTrend[] => {
  const trend: Record<number, number> = {};
  
  const sortedMoments = [...moments].sort((a, b) => a.Turn - b.Turn);

  let accumulated = 0;
  for (const moment of sortedMoments) {
    accumulated += moment.EraScore;
    trend[moment.Turn] = accumulated;
  }

  return Object.keys(trend).map(turnStr => ({
    turn: Number(turnStr),
    totalScore: trend[Number(turnStr)]
  })).sort((a, b) => a.turn - b.turn);
};

export const getSettlementBiomes = (moments: Moment[]): SettlementBiomes => {
  return moments.reduce(
    (acc, moment) => {
      if (moment.Type === 'MOMENT_CITY_BUILT_ON_DESERT') acc.desert++;
      if (moment.Type === 'MOMENT_CITY_BUILT_ON_TUNDRA') acc.tundra++;
      if (moment.Type === 'MOMENT_CITY_BUILT_ON_COAST') acc.coast++;
      if (moment.Type === 'MOMENT_CITY_BUILT_NEW_CONTINENT') acc.newContinent++;
      return acc;
    },
    { desert: 0, tundra: 0, coast: 0, newContinent: 0 }
  );
};

export const getGovernorStats = (moments: Moment[]): GovernorStats => {
  const appointed = moments.find(m => m.Type === 'MOMENT_GOVERNOR_ALL_APPOINTED_FIRST' || m.Type === 'GOVERNOR_ALL_APPOINTED_FIRST');
  const fullyPromoted = moments.find(m => m.Type === 'MOMENT_GOVERNOR_FULLY_PROMOTED_FIRST' || m.Type === 'GOVERNOR_FULLY_PROMOTED_FIRST');
  
  return {
    firstAppointed: appointed ? appointed.InstanceDescription : null,
    firstFullyPromoted: fullyPromoted ? fullyPromoted.InstanceDescription : null,
  };
};

export const getMilitaryActivity = (moments: Moment[]): MilitaryActivity => {
  return moments.reduce(
    (acc, moment) => {
      if (moment.Type === 'MOMENT_BATTLE_FOUGHT') acc.battles++;
      if (moment.Type.includes('UNIT_HIGH_LEVEL')) acc.eliteUnits++;
      if (moment.Type === 'MOMENT_PLAYER_MET_MAJOR' || moment.Type === 'MOMENT_LEADER_MET') acc.knownCivs++;
      return acc;
    },
    { battles: 0, eliteUnits: 0, knownCivs: 0 }
  );
};

export const getCuriosities = (moments: Moment[]): Curiosities => {
  const circumnavigation = moments.find(m => m.Type.includes('CIRCUMNAVIGATION'));
  
  const tribalVillages = moments.filter(m => m.Type === 'MOMENT_GOODY_HUT_TRIGGERED').length;
  const wondersBuilt = moments.filter(m => m.Type.includes('WONDER_COMPLETED')).length;

  return {
    circumnavigationTurn: circumnavigation ? circumnavigation.Turn : null,
    tribalVillages,
    wondersBuilt
  };
};
