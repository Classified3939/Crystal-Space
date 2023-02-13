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
import { InventoryItem } from "./items/inventoryItem";
import { ActionName, AllActions } from "./actions/allActions";

export class GameController {
    static mainInv: Inventory;
    static crystalInv: Inventory;
    static mainTrades: TradeList;
    static mainCrafts: CraftList;
    static mainActions: ActionList;
    static exchangers: ItemExchanger[];
    static engine: loop

    constructor() {
        GameController.mainInv = reactive(new Inventory("main"));
        GameController.crystalInv = reactive(new Inventory("crystal"));
        GameController.mainTrades = reactive(new TradeList("main"));
        GameController.mainCrafts = reactive(new CraftList("main"));
        GameController.mainActions = reactive(new ActionList("main"));
        this.initialize();
    }

    initialize() {
        GameController.mainInv.addItems(new Array(
            { type: AllItems.items[ItemNames.CopperCoin], amount: 20 }));
        GameController.mainTrades.addTrade(AllTrades.trades[TradeName.BuyPine]);
        GameController.mainTrades.addTrade(AllTrades.trades[TradeName.SellPine]);
        GameController.mainTrades.addTrade(AllTrades.trades[TradeName.BuyRedCrys]);
        GameController.mainCrafts.addCraft(AllCrafts.crafts[CraftName.WoodAxe]);
        GameController.mainCrafts.addCraft(AllCrafts.crafts[CraftName.EnergeticWoodAxe]);
        GameController.mainActions.addAction(AllActions.actions[ActionName.RunErrands]);
        GameController.mainActions.addAction(AllActions.actions[ActionName.ChopWood]);
        GameController.mainActions.addAction(AllActions.actions[ActionName.ChopWoodEnergized]);
        GameController.engine = loop((dt) => {
            GameController.mainTrades.updateTrades(dt);
            GameController.mainCrafts.updateCrafts(dt);
            GameController.mainActions.updateActions(dt);
        }).start();
    }
}