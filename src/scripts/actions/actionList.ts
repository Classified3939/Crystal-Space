import { CraftList } from "../crafting/craftList";
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
        newAction.exchanger.setItems(newAction.inputs, new Array(newAction.output))
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
            toDisplay += "Gives: " + action.output.amount + " " + action.output.type.display + "\n";
            if (action.inputs.length > 0) {
                toDisplay += "Requires:"
            }
            for (const cost of action.inputs) {
                toDisplay += (" " + cost.amount + " " + cost.type.display + "\n");
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
                    action.exchanger.gainItems();
                    action.progress = 0;
                }
            }
        }
    }

    doAction(index: number) {
        const action = this.manualActions[index];
        if (action.exchanger.canExchange() && action.progress === 0) {
            action.progress += 1 / 60;
        }
    }

    getActionTime(action: ManualAction) {
        return action.timeFunction(1);
    }
}