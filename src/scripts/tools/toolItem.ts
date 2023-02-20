import { ItemType } from "../items/allItems";
import { InventoryItem } from "../items/inventoryItem";
import { ToolAspects, ToolModifier } from "./allTools";


export interface ToolMaterial {
    materialModifier: number;
    display: string;
    materialId: string;
    crystalCostMult: number;
    timeCostMult: number;
}

export interface ToolType extends ItemType {
    maxDurability: number;
    slotsNeeded: number;
    aspects: ToolAspects[];
    baseCost: number;
    baseTime: number;
}

export interface ToolItem extends InventoryItem {
    type: ToolType;
    material: ToolMaterial;
    durability: number;
    totalDurability: number;
    level: number;
    modifier: ToolModifier;
    instance: number
}