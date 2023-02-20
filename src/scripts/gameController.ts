import { reactive } from "vue";
import { Inventory } from "./items/inventory"
import { AllItems, ItemNames } from "./items/allItems";
import { TradeList } from "./trading/tradeList"
import { AllTrades, TradeName } from "./trading/allTrades";
import loop from 'raf-loop';
import { ActionList } from "./actions/actionList";
import { ActionName, AllActions } from "./actions/allActions";
import { ToolInventory } from "./tools/toolInventory";
import { EquipList } from "./equipment/equipList";
import { Crafting as Crafting } from "./crafting/crafting";
import { AllTools, MaterialNames, ToolModifier, ToolNames } from "./tools/allTools";
import { ToolItem } from "./tools/toolItem";

export class GameController {
    static mainInv: Inventory;
    static crystalInv: Inventory;
    static toolInv: ToolInventory;
    static mainTrades: TradeList;
    static mainCrafts: Crafting;
    static mainActions: ActionList;
    static mainEquip: EquipList
    static engine: loop

    constructor() {
        GameController.mainInv = reactive(new Inventory("mainInv"));
        GameController.crystalInv = reactive(new Inventory("crystal"));
        GameController.toolInv = reactive(new ToolInventory("tools"));
        GameController.mainTrades = reactive(new TradeList("mainTrade"));
        GameController.mainCrafts = reactive(new Crafting("mainCraft"));
        GameController.mainActions = reactive(new ActionList("mainAction"));
        GameController.mainEquip = reactive(new EquipList("mainEquip", 2));
        this.initialize();
    }

    initialize() {
        GameController.mainInv.addItems(new Array(
            { type: AllItems.items[ItemNames.CopperCoin], amount: 10 }));

        GameController.toolInv.makeTool(AllTools.tools[ToolNames.Knife], AllTools.materials[MaterialNames.Wood], ToolModifier.None);
        GameController.mainEquip.equipTool(GameController.toolInv.items[0] as ToolItem);
        GameController.toolInv.loseTool(0);

        GameController.mainTrades.addTrade(AllTrades.trades[TradeName.BuyWood]);
        GameController.mainTrades.addTrade(AllTrades.trades[TradeName.SellWood]);
        GameController.mainTrades.addTrade(AllTrades.trades[TradeName.SellWoodTrinket]);
        GameController.mainTrades.addTrade(AllTrades.trades[TradeName.BuyStone]);
        GameController.mainTrades.addTrade(AllTrades.trades[TradeName.BuyRedCrys]);


        GameController.mainActions.addAction(AllActions.actions[ActionName.RunErrands]);
        GameController.mainActions.addAction(AllActions.actions[ActionName.ChopWood]);
        GameController.mainActions.addAction(AllActions.actions[ActionName.CarveWood]);
        GameController.engine = loop((dt) => {
            GameController.mainTrades.updateTrades(dt);
            GameController.mainCrafts.updateCrafts(dt);
            GameController.mainActions.updateActions(dt);
        }).start();
    }
}