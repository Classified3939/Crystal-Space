import { reactive } from "vue";
import { Inventory } from "./items/inventory"
import { AllItems, ItemNames } from "./items/allItems";
import { TradeList } from "./trading/tradeList"
import { AllTrades, TradeName } from "./trading/allTrades";
import loop from "raf-loop";
import { ActionList } from "./actions/actionList";
import { ActionName, AllActions } from "./actions/allActions";
import { ToolInventory } from "./tools/toolInventory";
import { EquipList } from "./equipment/equipList";
import { Crafting as Crafting } from "./crafting/crafting";
import { AllTools, MaterialNames, ToolModifier, ToolNames } from "./tools/allTools";
import { ToolItem } from "./tools/toolItem";
import { ResearchList } from "./research/researchList";
import { AllResearch, BasicResearchName } from "./research/allResearch";
import { InfoList } from "./infobox/infoList";
import { AllInfo, InfoType, StoryName } from "./infobox/allInfo";
import { StatController } from "./stats/statController";

export class GameController {
    static mainInv: Inventory;
    static crystalInv: Inventory;
    static toolInv: ToolInventory;
    static mainTrades: TradeList;
    static mainCrafts: Crafting;
    static mainActions: ActionList;
    static mainEquip: EquipList;
    static mainResearch: ResearchList;
    static infoBox: InfoList;
    static statController: StatController;
    static engine: any

    constructor() {
        GameController.mainInv = reactive(new Inventory("mainInv"));
        GameController.crystalInv = reactive(new Inventory("crystal"));
        GameController.toolInv = reactive(new ToolInventory("tools"));
        GameController.mainTrades = reactive(new TradeList("mainTrade"));
        GameController.mainCrafts = reactive(new Crafting("mainCraft"));
        GameController.mainActions = reactive(new ActionList("mainAction"));
        GameController.mainEquip = reactive(new EquipList("mainEquip", 2));
        GameController.mainResearch = reactive(new ResearchList("main"));
        GameController.infoBox = reactive(new InfoList("main"));
        GameController.statController = reactive(new StatController("mainStats"));
        if (!GameController.loadGame()) {
            this.initialize();
        }
        setInterval(GameController.save, 15000);
        setInterval(GameController.statController.checkUnlocks, 750);
        GameController.engine = loop((dt: DOMHighResTimeStamp) => {
            GameController.mainTrades.updateTrades(dt);
            GameController.mainCrafts.updateCrafts(dt);
            GameController.mainActions.updateActions(dt);
            GameController.mainResearch.updateResearch(dt);
        }).start();
    }

    initialize() {
        GameController.mainInv.addItems(new Array(
            { type: AllItems.items[ItemNames.CopperCoin], amount: 10 }));

        GameController.toolInv.makeTool(AllTools.tools[ToolNames.Knife], AllTools.materials[MaterialNames.Wood], ToolModifier.None);
        GameController.mainEquip.equipTool(GameController.toolInv.items[0] as ToolItem);
        GameController.toolInv.loseTool(0);

        GameController.mainTrades.addTrade(AllTrades.trades[TradeName.BuyWood]);
        GameController.mainTrades.addTrade(AllTrades.trades[TradeName.SellWoodTrinket]);


        GameController.mainActions.addAction(AllActions.actions[ActionName.RunErrands]);
        GameController.mainActions.addAction(AllActions.actions[ActionName.ChopWood]);
        GameController.mainActions.addAction(AllActions.actions[ActionName.CarveWood]);

        GameController.mainResearch.addResearch(AllResearch.basic[BasicResearchName.UnlockAxe]);

        GameController.infoBox.addInfo(AllInfo.story[StoryName.Welcome]);

        GameController.statController.initializeStats();
    }

    static save() {
        const gameSave = {
            inventory: GameController.mainInv.items,
            crystals: GameController.crystalInv.items,
            trades: GameController.mainTrades.availableTrades,
            tools: GameController.toolInv.items,
            equip: GameController.mainEquip.equipment,
            actions: GameController.mainActions.manualActions,
            crafting: GameController.mainCrafts,
            research: GameController.mainResearch.availableResearches,
            info: GameController.infoBox.infoShown.filter(i => i.type === InfoType.Story),
            stats: GameController.statController.stats,
        }
        localStorage.setItem("crystal-space", JSON.stringify(gameSave));
    }

    static loadGame(): boolean {
        const save = JSON.parse(localStorage.getItem("crystal-space"));
        console.log(save);
        if (save === null || save === undefined) {
            return false;
        }
        if (save.inventory !== undefined) GameController.mainInv.load(save.inventory);
        if (save.crystals !== undefined) GameController.crystalInv.load(save.crystals);
        if (save.trades !== undefined) GameController.mainTrades.load(save.trades);
        if (save.tools !== undefined) GameController.toolInv.load(save.tools);
        if (save.equip !== undefined) GameController.mainEquip.load(save.equip);
        if (save.actions !== undefined) GameController.mainActions.load(save.actions);
        if (save.crafting !== undefined) GameController.mainCrafts.load(save.crafting);
        if (save.research !== undefined) GameController.mainResearch.load(save.research);
        if (save.info !== undefined) GameController.infoBox.load(save.info);
        if (save.stats !== undefined) GameController.statController.load(save.stats);
        return true;
    }

    static deleteSave() {
        localStorage.setItem("crystal-space", null);
    }
}