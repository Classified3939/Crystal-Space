export interface ItemType {
    display: string,
    id: string,
    maxAmount: number;
    invType: string
}

export enum ItemNames {
    CopperCoin,
    Wood,
    RedCrystal,
    Stone,
    WoodAxe,
    EnergeticWoodAxe,
}

export class AllItems {
    static items: object = {
        [ItemNames.CopperCoin]: { display: "Copper Coin", id: "gold", maxAmount: 1000, invType: "main" },
        [ItemNames.Wood]: { display: "Wood", id: "wood", maxAmount: 100, invType: "main" },
        [ItemNames.Stone]: { display: "Stone", id: "stone", maxAmount: 20, invType: "main" },
        [ItemNames.RedCrystal]: { display: "Red Crystal", id: "crysRed", maxAmount: 5, invType: "crystal" },
        [ItemNames.WoodAxe]: { display: "Wooden Axe", id: "axeWood", maxAmount: 3, invType: "main" },
        [ItemNames.EnergeticWoodAxe]: { display: "Energetic Wooden Axe", id: "axeWoodEnergetic", maxAmount: 1, invType: "main" },
    }
}

