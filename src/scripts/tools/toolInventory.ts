import { Inventory, InventoryDisplay } from "../items/inventory"
import { InventoryItem } from "../items/inventoryItem";
import { ToolModifier } from "./allTools";
import { ToolItem, ToolMaterial, ToolType } from "./toolItem";

export class ToolInventory extends Inventory {

    constructor(id: string) {
        super(id);
        this.items = new Array<ToolItem>();
    }

    makeTool(toolType: ToolType, material: ToolMaterial, modifier: ToolModifier) {
        const adjustedDurability = material.materialModifier * toolType.maxDurability;
        const newTool = { type: toolType, amount: 1, material: material, durability: adjustedDurability, totalDurability: adjustedDurability, level: 1, modifier: modifier, instance: 0 }
        while (this.checkIdentical(newTool)) {
            newTool.instance += 1;
        }
        this.items.push(newTool);
    }

    addItems(itemsToAdd: InventoryItem[]): void {
        for (const item of itemsToAdd) {
            this.items.push(item);
        }
    }

    loseTool(index: number) {
        this.items.splice(index, 1);
    }

    getDisplay(): Array<ToolDisplay> {
        const toDisplay = new Array<ToolDisplay>();
        for (const item of this.items) {
            const tool = item as ToolItem;
            let displayItem = "";
            if (tool.modifier !== ToolModifier.None) displayItem += tool.modifier + " ";
            displayItem += tool.material.display + " " + tool.type.display
            toDisplay.push({
                display: displayItem, id: tool.type.id + "-" + tool.amount + tool.modifier,
                durabilityPercent: tool.durability / tool.totalDurability * 100
            });
        }
        return toDisplay;
    }

    checkIdentical(newTool: ToolItem): boolean {
        const tools = this.items as ToolItem[];
        return (tools.find(t => t.type.id === newTool.type.id && t.modifier === newTool.modifier && t.material === newTool.material &&
            t.level === newTool.level && t.instance === newTool.instance)) !== undefined;
    }
}

export interface ToolDisplay extends InventoryDisplay {
    durabilityPercent: number;
}