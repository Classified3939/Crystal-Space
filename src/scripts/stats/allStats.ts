import { GameController } from "../GameController";
import { AllInfo, StoryName } from "../infobox/allInfo";
import { StatType, StatName } from "./statItem";

export class AllStats {
    static stats: Record<StatName, StatType> = {
        [StatName.ItemsCrafted]: {
            name: StatName.ItemsCrafted,
            display: "Items Crafted",
            unlock: (amount: number): void => {
                //empty
            }
        },
        [StatName.ToolsCrafted]: {
            name: StatName.ToolsCrafted,
            display: "Tools Crafted",
            unlock: (amount: number): void => {
                //empty
            }
        },
        [StatName.MaterialsBought]: {
            name: StatName.MaterialsBought,
            display: "Materials Bought",
            unlock: (amount: number): void => {
                //empty
            }
        },
        [StatName.MaterialsSold]: {
            name: StatName.MaterialsSold,
            display: "Materials Sold",
            unlock: (amount: number): void => {
                //empty
            }
        },
        [StatName.CraftedSold]: {
            name: StatName.CraftedSold,
            display: "Crafted Items Sold",
            unlock: (amount: number): void => {
                if (amount === 1 && GameController.infoBox.infoShown.find(i => i.name === StoryName.FirstTrinket) === undefined) {
                    GameController.infoBox.addInfo(AllInfo.story[StoryName.FirstTrinket]);
                }
            }
        },
        [StatName.CrystalsBought]: {
            name: StatName.CrystalsBought,
            display: "Crystals Bought",
            unlock: (amount: number): void => {
                //empty
            }
        },
        [StatName.MaterialsMined]: {
            name: StatName.MaterialsMined,
            display: "Materials Mined",
            unlock: (amount: number): void => {
                //empty
            }
        },
    }
}