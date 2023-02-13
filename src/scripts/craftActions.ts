import { ItemCraft } from "./crafting/itemCraft";
import { GameController } from "./GameController";

export class CraftActions {
    availableCrafts: ItemCraft[];
    id: string;

    constructor(id: string) {
        this.id = id;
        console.log(this.availableCrafts)
        this.availableCrafts = new Array<ItemCraft>;
    }

    addcraft(newCraft: ItemCraft) {
        const checkcrafts = this.availableCrafts.find(craft => craft.id == newCraft.id);
        if (checkcrafts !== undefined) return;
        this.availableCrafts.push(newCraft);
        console.log(newCraft);
        console.log(this.availableCrafts);
    }

    removeCraft(lockedCraft: ItemCraft) {
        const checkCrafts = this.availableCrafts.find(craft => craft.id == lockedCraft.id);
        if (checkCrafts === undefined) return;
        this.availableCrafts = this.availableCrafts.filter(craft => craft.id !== lockedCraft.id);
    }

    getCrafts(): string[] {
        const craftArray = new Array<string>();
        for (const craft of this.availableCrafts) {
            let toDisplay = "Craft " + craft.output.type.display;
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
                    this.exchangeItems(craft);
                    craft.progress = 0;
                }
            }
        }
    }

    makeCraft(index: number) {
        const craft = this.availableCrafts[index];
        const mainInputs = craft.inputs.filter(i => i.type.invType === "main");
        const crysInputs = craft.inputs.filter(i => i.type.invType === "crystal");

        if (mainInputs.length > 0) {
            if (!GameController.mainInv.hasItems(mainInputs)) return;
        }
        if (crysInputs.length > 0) {
            if (!GameController.crystalInv.hasItems(crysInputs)) return;
        }

        if (craft.output.type.invType == "main") {
            if (!GameController.mainInv.canAddItem(craft.output.type, craft.output.amount)) return;
            else {
                craft.progress += 1 / 60;
            }
        }
        if (craft.output.type.invType == "crystal") {
            if (!GameController.crystalInv.canAddItem(craft.output.type, craft.output.amount)) return;
            else {
                craft.progress += 1 / 60;
            }
        }
    }

    exchangeItems(craft: ItemCraft) {
        const mainInputs = craft.inputs.filter(i => i.type.invType === "main");
        const crysInputs = craft.inputs.filter(i => i.type.invType === "crystal");

        GameController.mainInv.loseItems(mainInputs);
        GameController.crystalInv.loseItems(crysInputs);
        const outputToMain = craft.output.type.invType === "main";
        if (outputToMain) {
            GameController.mainInv.addItems(new Array(craft.output));
        }
        else {
            GameController.crystalInv.addItems(new Array(craft.output));
        }
    }

    getCraftTime(craft: ItemCraft): number {
        return craft.timeFunction(1);
    }
}