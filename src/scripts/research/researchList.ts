import { ItemExchanger } from "../items/itemExchanger";
import { AllResearch } from "./allResearch";
import { BasicResearch } from "./basicResearch";

export class ResearchList {
    id: string;
    availableResearches: BasicResearch[];

    constructor(id: string) {
        this.id = id;
        this.availableResearches = new Array<BasicResearch>();
    }

    addResearch(research: BasicResearch) {
        if (this.availableResearches.find(r => r.name === research.name) !== undefined) return;
        research.exchanger.setItems(research.inputs, new Array());
        this.availableResearches.push(research);
    }

    getDisplay(): string[] {
        const displayArray = new Array<string>();
        for (const research of this.availableResearches) {
            let toDisplay = "\t" + research.name + "\n";
            toDisplay += " Costs: ";
            if (research.inputs.length === 0) toDisplay += "Free\n";
            else {
                for (const input of research.inputs) {
                    if (research.inputs.indexOf(input) > 0) { toDisplay += "\t\t" }
                    toDisplay += input.amount + " " + input.type.display + "\n"
                }
            }
            toDisplay += " Time: " + research.toComplete + " Seconds";
            displayArray.push(toDisplay)
        }
        return displayArray;
    }

    doResearch(index: number) {
        const research = this.availableResearches[index];
        if (research.exchanger.canExchange() && research.progress === 0) {
            research.progress += 1 / 60;
            research.exchanger.loseItems();
        }
    }

    updateResearch(dt: DOMHighResTimeStamp) {
        for (const research of this.availableResearches) {
            if (research.progress > 0) {
                research.progress += (dt / 1000);
                if (research.progress >= research.toComplete) {
                    research.onResearch();
                    research.progress = 0;
                    this.availableResearches.splice(this.availableResearches.indexOf(research), 1);
                }
            }
        }
    }

    load(toLoad: BasicResearch[]) {
        this.availableResearches = new Array<BasicResearch>();
        for (const research of toLoad) {
            research.exchanger = new ItemExchanger();
            research.onResearch = (AllResearch.basic[research.name]).onResearch;

            this.addResearch(research);
        }
    }
}