import { GameController } from "../GameController";
import { AllStats } from "./allStats";
import { StatItem, StatName } from "./statItem";

export class StatController {
    id: string;
    stats: StatItem[];

    constructor(id: string) {
        this.id = id;
        this.stats = new Array<StatItem>();
    }

    initializeStats() {
        this.stats = new Array<StatItem>();
        for (let i = 0; i < Object.keys(StatName).length / 2; i++) {
            this.stats.push({ type: AllStats.stats[i as StatName], amount: 0 })
        }
    }

    load(toLoad: StatItem[]) {
        for (const stat of toLoad) {
            stat.type.unlock = (AllStats.stats[stat.type.name].unlock);
            console.log("LOADING Stat");
            this.stats.push(stat);
        }
    }

    checkUnlocks() {
        for (const stat of GameController.statController.stats) {
            stat.type.unlock(stat.amount);
        }
    }

    addToStat(name: StatName) {
        this.stats.find(s => s.type.name === name).amount += 1;
    }
}