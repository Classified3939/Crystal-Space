import { ToolMaterial, ToolType } from "./toolItem";

export enum ToolNames {
    Knife,
    Axe,
}

export enum MaterialNames {
    Wood,
    Stone,
}

export enum ToolModifier {
    None = "None",
    Red = "Energetic"
}

export enum ToolAspects {
    None = "None",
    Axe = "Axe",
    Knife = "Knife",
}

export class AllTools {
    static tools: Record<ToolNames, ToolType> = {
        [ToolNames.Axe]: {
            display: "Axe", id: "axe", maxAmount: Infinity, invType: "tools",
            maxDurability: 100, slotsNeeded: 1, aspects: new Array(ToolAspects.Axe), baseCost: 2, baseTime: 5
        },
        [ToolNames.Knife]: {
            display: "Knife", id: "knife", maxAmount: Infinity, invType: "tools",
            maxDurability: 50, slotsNeeded: 1, aspects: new Array(ToolAspects.Knife), baseCost: 1, baseTime: 2,
        }
    };
    static materials: Record<MaterialNames, ToolMaterial> = {
        [MaterialNames.Wood]: {
            materialModifier: 0.1,
            display: "Wooden",
            materialId: "wood",
            crystalCostMult: 1,
            timeCostMult: 1,
        },
        [MaterialNames.Stone]: {
            materialModifier: 0.25,
            display: "Stone",
            materialId: "stone",
            crystalCostMult: 2,
            timeCostMult: 3,
        }
    }
}