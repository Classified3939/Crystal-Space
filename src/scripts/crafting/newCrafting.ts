import { AllItems, ItemNames } from "../items/allItems";
import { InventoryItem } from "../items/inventoryItem";
import { AllTools, MaterialNames, ToolNames } from "../tools/allTools";
import { ToolMaterial, ToolModifier, ToolType } from "../tools/toolItem";

export class NewCrafting {
    id: string;
    chosenMaterial: ToolMaterial;
    chosenType: ToolType;
    chosenModifier: ToolModifier;

    constructor(id: string) {
        this.id = id;
        this.chosenMaterial = AllTools.materials[MaterialNames.Wood];
        this.chosenType = AllTools.tools[ToolNames.Axe];
        this.chosenModifier = ToolModifier.None;
    }

    setMaterial(mat: ToolMaterial) {
        this.chosenMaterial = mat
    }

    setType(type: ToolType) {
        this.chosenType = type;
    }

    setModifier(mod: ToolModifier) {
        this.chosenModifier = mod;
    }

    craftTool() {
        console.log("CRAFTING " + this.getCraftName());
    }

    calculateCost(): InventoryItem[] {
        let matType = AllItems.items[ItemNames.Wood];
        if (this.chosenMaterial.materialId === AllTools.materials[MaterialNames.Stone].materialId) {
            matType = AllItems.items[ItemNames.Stone];
        };
        let matCost = this.chosenType.baseCost;
        if (this.chosenModifier === ToolModifier.Red) matCost *= 3;
        const costArray = new Array<InventoryItem>();
        costArray.push({ type: matType, amount: matCost });

        if (this.chosenModifier !== ToolModifier.None) {
            let crystalType = AllItems.items[ItemNames.RedCrystal];
            costArray.push({ type: crystalType, amount: this.chosenMaterial.crystalCostMult })
        }
        return costArray;
    }

    calculateTime(): number {
        return this.chosenType.baseTime * this.chosenMaterial.timeCostMult;
    }

    getDisplay(): string {
        let toDisplay = "Craft Tool\n";
        toDisplay += this.getCraftName() + "\n";
        toDisplay += "Costs: ";
        for (const item of this.calculateCost()) {
            toDisplay += item.amount + " " + item.type.display + "\n";
        }
        toDisplay += "Time: " + this.calculateTime();
        return toDisplay;
    }

    getCraftName(): string {
        return (this.chosenModifier !== ToolModifier.None ? this.chosenModifier + " " : "") + this.chosenMaterial.display + " " + this.chosenType.display;
    }
}