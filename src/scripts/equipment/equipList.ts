import { ToolDisplay } from "../tools/toolInventory";
import { ToolItem } from "../tools/toolItem";
import { GameController } from "../GameController"
import { ToolModifier } from "../tools/allTools";

export class EquipList {
    id: string;
    equipment: ToolItem[];
    slots: number;
    filledSlots: number;

    constructor(id: string, slots: number) {
        this.id = id;
        this.slots = slots;
        this.filledSlots = 0;
        this.equipment = new Array<ToolItem>()
    }

    equipTool(tool: ToolItem) {
        if (!this.canEquipTool(tool)) return;
        this.equipment.push(tool);
        this.filledSlots += tool.type.slotsNeeded;
    }

    canEquipTool(tool: ToolItem): boolean {
        return (this.filledSlots + tool.type.slotsNeeded <= this.slots);
    }

    loseTool(index: number) {
        this.filledSlots -= this.equipment[index].type.slotsNeeded;
        if (this.filledSlots < 0) this.filledSlots = 0;
        this.equipment.splice(index, 1);
    }

    putToolBack(index: number) {
        GameController.toolInv.addItems(new Array(this.equipment[index]));
        this.loseTool(index);
    }

    loseDurability(tool: ToolItem) {
        tool.durability -= 1;
        if (tool.durability <= 0) {
            this.loseTool(this.equipment.indexOf(tool));
        }
    }

    getDisplay(): Array<ToolDisplay> {
        const toDisplay = new Array<ToolDisplay>();
        for (const item of this.equipment) {
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

    load(toLoad: ToolItem[]) {
        this.equipment = toLoad;
    }
}