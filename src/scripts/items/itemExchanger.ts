import { GameController } from "../GameController";
import { InventoryItem } from "./inventoryItem";

export class ItemExchanger {
    toLose: InventoryItem[];
    toGain: InventoryItem[];

    setItems(toLose: InventoryItem[], toGain: InventoryItem[]) {
        this.toLose = toLose;
        this.toGain = toGain;
    }

    canExchange(multiplier?: number): boolean {
        if (this.toLose === undefined || this.toGain === undefined) return false;
        if (multiplier === undefined) multiplier = 1;
        const mainInputs = this.toLose.filter(i => i.type.invType === "main");
        const crysInputs = this.toLose.filter(i => i.type.invType === "crystal");

        if (mainInputs.length > 0 && !GameController.mainInv.hasItems(mainInputs)) return false;
        if (crysInputs.length > 0 && !GameController.crystalInv.hasItems(crysInputs)) return false;

        const mainOutputs = this.toGain.filter(i => i.type.invType === "main");
        const crysOutputs = this.toGain.filter(i => i.type.invType === "crystal");

        if (mainOutputs.length > 0 && !GameController.mainInv.canAddItemList(mainOutputs)) return false
        if (crysOutputs.length > 0 && !GameController.crystalInv.canAddItemList(crysOutputs)) return false
        return true;
    }

    loseItems() {
        const mainInputs = this.toLose.filter(i => i.type.invType === "main");
        const crysInputs = this.toLose.filter(i => i.type.invType === "crystal");

        GameController.mainInv.loseItems(mainInputs);
        GameController.crystalInv.loseItems(crysInputs);
    }

    gainItems(outputMultiplier?: number) {

        const mainOutputs = this.toGain.filter(i => i.type.invType === "main");
        const crysOutputs = this.toGain.filter(i => i.type.invType === "crystal");

        GameController.mainInv.addItems(mainOutputs, outputMultiplier);
        GameController.crystalInv.addItems(crysOutputs, outputMultiplier);
    }
}