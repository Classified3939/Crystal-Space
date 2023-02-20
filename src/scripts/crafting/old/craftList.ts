/*import { ItemCraft } from "./itemCraft";
import { GameController } from "../../GameController";
import { ItemExchanger } from "../../items/itemExchanger";

export class CraftList {
    availableCrafts: ItemCraft[];
    id: string;

    constructor(id: string) {
        this.id = id;
        this.availableCrafts = new Array<ItemCraft>();
    }


    addCraft(newCraft: ItemCraft) {
        const checkcrafts = this.availableCrafts.find(craft => craft.id == newCraft.id);
        if (checkcrafts !== undefined) return;
        this.availableCrafts.push(newCraft);
        newCraft.exchanger.setItems(newCraft.inputs, newCraft.output);
    }

    removeCraft(lockedCraft: ItemCraft) {
        const checkCrafts = this.availableCrafts.find(craft => craft.id == lockedCraft.id);
        if (checkCrafts === undefined) return;
        this.availableCrafts = this.availableCrafts.filter(craft => craft.id !== lockedCraft.id);
    }

    getCrafts(): string[] {
        const craftArray = new Array<string>();
        for (const craft of this.availableCrafts) {
            let toDisplay = "Craft " + craft.output[0].type.display;
            toDisplay += "\n Costs:"
            for (const cost of craft.inputs) {
                toDisplay += (" " + cost.amount + " " + cost.type.display + "\n");
            }
            toDisplay += " Time: " + craft.timeFunction(1) + " Seconds\n";
            craftArray.push(toDisplay);
        }
        return craftArray;
    }

    updateCrafts(dt: DOMHighResTimeStamp) {
        for (const craft of this.availableCrafts) {
            if (craft.progress > 0) {
                craft.progress += (dt / 1000);
                if (craft.progress >= this.getCraftTime(craft)) {
                    craft.exchanger.gainItems();
                    craft.progress = 0;
                }
            }
        }
    }

    makeCraft(index: number) {
        const craft = this.availableCrafts[index];

        if (craft.exchanger.canExchange() && craft.progress === 0) {
            craft.exchanger.loseItems();
            craft.progress += 1 / 60;
        }
    }

    getCraftTime(craft: ItemCraft): number {
        return craft.timeFunction(1);
    }
}*/