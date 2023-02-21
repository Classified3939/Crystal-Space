export interface ItemType {
    display: string,
    id: string,
    maxAmount: number;
    invType: string
}

export enum ItemNames {
    CopperCoin,
    Wood,
    WoodenTrinket,
    Stone,
    RedCrystal,
}

export class AllItems {
    static items: Record<ItemNames,ItemType> = {
        [ItemNames.CopperCoin]: { display: "Copper Coin", id: "gold", maxAmount: 1000, invType: "main" },
        [ItemNames.Wood]: { display: "Wood", id: "wood", maxAmount: 100, invType: "main" },
        [ItemNames.WoodenTrinket]: { display: "Wooden Trinket", id: "trinketWood", maxAmount: 15, invType: "main" },
        [ItemNames.Stone]: { display: "Stone", id: "stone", maxAmount: 20, invType: "main" },
        [ItemNames.RedCrystal]: { display: "Red Crystal", id: "crysRed", maxAmount: 5, invType: "crystal" },
    }
}

