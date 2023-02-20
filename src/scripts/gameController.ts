import { nextTick, reactive, ref } from "vue";
import { Inventory } from "./items/inventory"
import { AllItems, ItemNames } from "./items/allItems";
import { TradeList } from "./trading/tradeList"
import { AllTrades, TradeName } from "./trading/allTrades";
import loop from 'raf-loop';
import { CraftList } from "./crafting/craftList";
import { AllCrafts, CraftName } from "./crafting/allCrafts";
import { ActionList } from "./actions/actionList";
import { ItemExchanger } from "./items/itemExchanger";
import { ActionName, AllActions } from "./actions/allActions";
import { AllTools, MaterialNames, ToolNames } from "./tools/allTools";
import { ToolModifier } from "./tools/toolItem";
import { ToolInventory } from "./tools/toolInventory";
import { EquipList } from "./equipment/equipList";
import { NewCrafting as Crafting } from "./crafting/newCrafting";

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
        GameController.mainEquip = reactive(new EquipList("mainEquip", 1));
        this.initialize();
    }

    initialize() {
        GameController.mainInv.addItems(new Array(
            { type: AllItems.items[ItemNames.CopperCoin], amount: 20 }));

        GameController.mainTrades.addTrade(AllTrades.trades[TradeName.BuyWood]);
        GameController.mainTrades.addTrade(AllTrades.trades[TradeName.SellWood]);
        GameController.mainTrades.addTrade(AllTrades.trades[TradeName.BuyRedCrys]);
        GameController.mainActions.addAction(AllActions.actions[ActionName.RunErrands]);
        GameController.mainActions.addAction(AllActions.actions[ActionName.ChopWood]);
        //GameController.mainActions.addAction(AllActions.actions[ActionName.ChopWoodEnergized]);
        GameController.engine = loop((dt) => {
            GameController.mainTrades.updateTrades(dt);
            //GameController.mainCrafts.updateCrafts(dt);
            GameController.mainActions.updateActions(dt);
        }).start();
    }
}