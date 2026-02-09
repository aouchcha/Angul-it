export interface PlayerInfos {
    username: string;
    TotalLevels: number;
    TotalTime: Date;
    CurrentLevel: number;
}

export let players : Map<string, PlayerInfos> = new Map();