import { GameController } from "../GameController";
import { ItemExchanger } from "../items/itemExchanger";
import { ToolAspects, ToolModifier } from "../tools/allTools";
import { ToolItem, ToolType } from "../tools/toolItem";
import { AllActions } from "./allActions";
import { ManualAction } from "./manualAction";

export class ActionList {
    id: string;
    manualActions: ManualAction[];

    constructor(id: string) {
        this.id = id;
        this.manualActions = new Array<ManualAction>();
    }

    addAction(newAction: ManualAction) {
        const checkActions = this.manualActions.find(action => action.id == newAction.id);
        if (checkActions !== undefined) return;
        this.manualActions.push(newAction);
        newAction.exchanger.setItems(newAction.inputs, new Array(newAction.output));
    }

    removeAction(lockedaction: ManualAction) {
        const checkactions = this.manualActions.find(action => action.id == lockedaction.id);
        if (checkactions === undefined) return;
        this.manualActions = this.manualActions.filter(action => action.id !== lockedaction.id);
    }

    getActions(): string[] {
        const actionArray = new Array<string>();
        for (const action of this.manualActions) {
            let toDisplay = action.display + "\n";
            toDisplay += "Gives: " + (action.requiredTool === ToolAspects.None? action.output.amount + " " : "") + action.output.type.display + "\n";
            if (action.requiredTool !== ToolAspects.None) {
                toDisplay += "Requires: " + action.requiredTool + "\n";
            }
            if (action.inputs.length > 0) {
                toDisplay += "Costs: ";
                for (const input of action.inputs) {
                    toDisplay += input.amount + " " + input.type.display + "\n";
                }
            }
            toDisplay += " Time: " + action.timeFunction(1) + " Seconds\n";
            actionArray.push(toDisplay);
        }
        return actionArray;
    }

    updateActions(dt: DOMHighResTimeStamp) {
        for (const action of this.manualActions) {
            if (action.progress > 0) {
                action.progress += (dt / 1000);
                if (action.progress >= action.timeFunction(1)) {
                    for (let i = 0; i < action.actionStack; i++) {
                        action.exchanger.gainItems();
                    }
                    action.actionStack = 0;
                    action.progress = 0;
                }
            }
        }
    }

    doAction(index: number) {
        const action = this.manualActions[index];
        if (this.canDoAction(action) && action.progress === 0) {
            action.actionStack = 0;
            if (action.requiredTool === ToolAspects.None) action.actionStack += 1;
            else {
                const possibleTools = this.getUsedTools(action);
                for (let i = 0; i < possibleTools.length; i++) {
                    if (!action.exchanger.canExchange()) break;
                    action.exchanger.loseItems();
                    GameController.mainEquip.loseDurability(possibleTools[i]);
                    action.actionStack += 1;
                    this.calcReward(possibleTools[i], action);
                }
            }
            action.progress += 1 / 60;
        }
    }

    hasActionTool(action: ManualAction | number): boolean {
        if (typeof action === "number") {
            action = this.manualActions[action]
        }
        if (this.getUsedTools(action).length > 0 || (action as ManualAction).requiredTool === ToolAspects.None) {
            return true;
        }
        return false;
    }

    canDoAction(action: ManualAction): boolean {
        return (this.hasActionTool(action) && action.exchanger.canExchange())
    }

    getUsedTools(action: ManualAction): ToolItem[] {
        const toolArray = new Array<ToolItem>();
        if (action.requiredTool === ToolAspects.None) return toolArray;
        for (const item of GameController.mainEquip.equipment) {
            const tool = item as ToolItem;
            if ((tool.type as ToolType).aspects.filter(a => a === (action as ManualAction).requiredTool).length > 0) {
                toolArray.push(tool as ToolItem);
            }
        }
        return toolArray;
    }

    calcReward(tool: ToolItem, action: ManualAction) {
        if (tool.modifier === ToolModifier.Red) {
            action.actionStack += 2
        }
    }

    getActionTime(action: ManualAction) {
        return action.timeFunction(1);
    }

    load(toLoad: ManualAction[]){
        this.manualActions = new Array<ManualAction>()
        for (const action of toLoad){
            action.exchanger = new ItemExchanger();
            action.timeFunction = AllActions.actions[action.id].timeFunction;
            this.addAction(action);
        }
    }
}