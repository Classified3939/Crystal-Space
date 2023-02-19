import { ToolDisplay } from "../tools/toolInventory";
import { ToolItem, ToolModifier } from "../tools/toolItem";
import { GameController } from "../GameController"

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
        if (this.filledSlots + tool.type.slotsNeeded > this.slots) return;
        this.equipment.push(tool);
        this.filledSlots += tool.type.slotsNeeded;
    }

    unequipTool(index: number) {
        this.filledSlots -= this.equipment[index].type.slotsNeeded;
        const removedTool = this.equipment.splice(index, 1);
        console.log(removedTool);
        GameController.toolInv.addItems(removedTool);
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
}