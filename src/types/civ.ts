export interface Player {
    Id: number
    Civilization: string
    CivilizationShortDescription: string
    LeaderName: string
}

export interface Moment {
    Id: number
    Type: string
    Turn: number
    GameEra: string
    EraScore: number
    InstanceDescription: string
}

export interface CivGameData {
    Players: Player[]
    Moments: Moment[]
}