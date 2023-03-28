export enum StatName {
    ItemsCrafted,
    ToolsCrafted,
    MaterialsBought,
    MaterialsSold,
    CraftedSold,
    CrystalsBought,
    MaterialsMined,
}

export interface StatType {
    name: StatName,
    display: string,
    unlock: (amount: number) => void,
}

export interface StatItem {
    type: StatType,
    amount: number,
}