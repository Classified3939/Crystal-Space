import { GameController } from "../GameController";
import { AllInfo, StoryName } from "../infobox/allInfo";
import { AllItems, ItemNames } from "../items/allItems";
import { ItemExchanger } from "../items/itemExchanger";
import { AllTools, MaterialNames, ToolModifier, ToolNames } from "../tools/allTools";
import { AllTrades, TradeName } from "../trading/allTrades";
import { BasicResearch } from "./basicResearch";

export enum BasicResearchName {
    UnlockAxe = "Axe Blueprint",
    UnlockStone = "Basic Stonework",
    UnlockCrystal = "Crystal Trading",
    UnlockEnergetic = "'Energetic' Modifier",
}

export class AllResearch {
    static basic: Record<BasicResearchName, BasicResearch> = {
        [BasicResearchName.UnlockAxe]: {
            name: BasicResearchName.UnlockAxe,
            inputs: new Array(
                { type: AllItems.items[ItemNames.Wood], amount: 3 }
            ),
            toComplete: 5,
            progress: 0,
            onResearch: (): void => {
                GameController.mainCrafts.availableTypes.push(AllTools.tools[ToolNames.Axe]);
                GameController.mainTrades.addTrade(AllTrades.trades[TradeName.SellWood]);
                GameController.mainResearch.addResearch(AllResearch.basic[BasicResearchName.UnlockStone]);
                GameController.infoBox.addInfo(AllInfo.story[StoryName.ResearchAxe]);
            },
            exchanger: new ItemExchanger(),
        },
        [BasicResearchName.UnlockStone]: {
            name: BasicResearchName.UnlockStone,
            inputs: new Array(
                { type: AllItems.items[ItemNames.CopperCoin], amount: 25 }
            ),
            toComplete: 7,
            progress: 0,
            onResearch: (): void => {
                GameController.mainCrafts.availableMaterials.push(AllTools.materials[MaterialNames.Stone]);
                GameController.mainTrades.addTrade(AllTrades.trades[TradeName.BuyStone]);
                GameController.mainResearch.addResearch(AllResearch.basic[BasicResearchName.UnlockCrystal]);
                GameController.infoBox.addInfo(AllInfo.story[StoryName.ResearchStone]);
            },
            exchanger: new ItemExchanger(),
        },
        [BasicResearchName.UnlockCrystal]: {
            name: BasicResearchName.UnlockCrystal,
            inputs: new Array(
                { type: AllItems.items[ItemNames.Stone], amount: 3 }
            ),
            toComplete: 7,
            progress: 0,
            onResearch: (): void => {
                GameController.mainTrades.addTrade(AllTrades.trades[TradeName.BuyRedCrys]);
                GameController.mainResearch.addResearch(AllResearch.basic[BasicResearchName.UnlockEnergetic]);
                GameController.infoBox.addInfo(AllInfo.story[StoryName.CrystalTrading]);
            },
            exchanger: new ItemExchanger(),
        },
        [BasicResearchName.UnlockEnergetic]: {
            name: BasicResearchName.UnlockEnergetic,
            inputs: new Array(
                { type: AllItems.items[ItemNames.RedCrystal], amount: 1 },
                { type: AllItems.items[ItemNames.Wood], amount: 3 }
            ),
            toComplete: 10,
            progress: 0,
            onResearch: (): void => {
                GameController.mainCrafts.availableModifiers.push(ToolModifier.Red);
                GameController.toolInv.makeTool(AllTools.tools[ToolNames.Knife], AllTools.materials[MaterialNames.Wood], ToolModifier.Red)
            },
            exchanger: new ItemExchanger(),
        }
    }
}