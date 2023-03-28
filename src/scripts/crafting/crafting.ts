import { GameController } from "../GameController";
import { AllItems, ItemNames } from "../items/allItems";
import { InventoryItem } from "../items/inventoryItem";
import { ItemExchanger } from "../items/itemExchanger";
import { StatName } from "../stats/statItem";
import { AllTools, MaterialNames, ToolModifier, ToolNames } from "../tools/allTools";
import { ToolMaterial, ToolType } from "../tools/toolItem";

export class Crafting {
    id: string;
    chosenMaterial: ToolMaterial;
    chosenType: ToolType;
    chosenModifier: ToolModifier;
    exchanger: ItemExchanger;
    progress: number;
    totalTime: number;
    availableMaterials: ToolMaterial[];
    availableTypes: ToolType[];
    availableModifiers: ToolModifier[];

    constructor(id: string) {
        this.id = id;
        this.availableMaterials = new Array(AllTools.materials[MaterialNames.Wood])
        this.availableTypes = new Array(AllTools.tools[ToolNames.Knife]);
        this.availableModifiers = new Array(ToolModifier.None);

        this.chosenMaterial = AllTools.materials[MaterialNames.Wood];
        this.chosenType = AllTools.tools[ToolNames.Knife];
        this.chosenModifier = ToolModifier.None;
        this.exchanger = new ItemExchanger();
        this.progress = 0;
        this.totalTime = this.calculateTime();
    }

    setMaterial(mat: ToolMaterial) {
        if (this.progress === 0 && this.availableMaterials.filter(m => m.materialId === mat.materialId) !== undefined) {
            this.chosenMaterial = mat
        }
    }

    setType(type: ToolType) {
        if (this.progress === 0 && this.availableTypes.filter(t => t.id === type.id) !== undefined) {
            this.chosenType = type
        }
    }

    setModifier(mod: ToolModifier) {
        if (this.progress === 0 && this.availableModifiers.filter(m => m === mod) !== undefined) {
            this.chosenModifier = mod
        }
    }

    craftTool() {
        this.totalTime = this.calculateTime();
        if (!this.canCraftTool()) return;
        else {
            this.exchanger.loseItems();
            this.progress += 1 / 60;
        }
    }

    canCraftTool(): boolean {
        this.exchanger.setItems(this.calculateCost(), new Array());
        return this.exchanger.canExchange() && this.progress === 0;
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

    updateCrafts(dt: DOMHighResTimeStamp) {
        if (this.progress > 0) {
            this.progress += (dt / 1000);
            if (this.progress >= this.totalTime) {
                GameController.toolInv.makeTool(this.chosenType, this.chosenMaterial, this.chosenModifier);
                this.progress = 0;
                this.totalTime = this.calculateTime();
                GameController.statController.addToStat(StatName.ToolsCrafted);
            }
        }
    }

    load(toLoad: Crafting) {
        this.availableMaterials = toLoad.availableMaterials;
        this.availableTypes = toLoad.availableTypes;
        this.availableModifiers = toLoad.availableModifiers;
        this.setMaterial(toLoad.chosenMaterial);
        this.setModifier(toLoad.chosenModifier);
        this.setType(toLoad.chosenType);
        this.totalTime = this.calculateTime();
        this.progress = toLoad.progress;
        this.exchanger = new ItemExchanger();
    }
}