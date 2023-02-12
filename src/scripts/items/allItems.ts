export interface ItemType {
    display: string,
    id: string,
    maxAmount: number;
    invType: string
}

export enum ItemNames {
    CopperCoin,
    PineWood,
    RedCrystal,
}

export class AllItems {
    static items: object = {
        [ItemNames.CopperCoin]: { display: "Copper Coin", id: "gold", maxAmount: 1000, invType: "main" },
        [ItemNames.PineWood]: { display: "Pine Wood", id: "woodPine", maxAmount: 100, invType: "main" },
        [ItemNames.RedCrystal]: { display: "Red Crystal", id: "crysRed", maxAmount: 5, invType: "crystal" },
    }
}

