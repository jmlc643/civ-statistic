export interface EraScoreTrend {
  turn: number;
  totalScore: number;
}

export interface SettlementBiomes {
  desert: number;
  tundra: number;
  coast: number;
  newContinent: number;
}

export interface GovernorStats {
  firstAppointed: string | null;
  firstFullyPromoted: string | null;
}

export interface MilitaryActivity {
  battles: number;
  eliteUnits: number;
  knownCivs: number;
}

export interface Curiosities {
  circumnavigationTurn: number | null;
  tribalVillages: number;
  wondersBuilt: number;
}
