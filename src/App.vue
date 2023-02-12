<script setup lang="ts">
import GameContainer from "./components/GameContainer.vue"
import InventoryTab from "./components/InventoryTab.vue";
import TradingTab from "./components/TradingTab.vue";
import { AllItems, ItemNames } from "./scripts/items/allItems";
import { AllTrades, TradeName } from "./scripts/trading/allTrades";
import { GameController } from "./scripts/gameController";

const controller = new GameController();
controller.initialize();

const data = {
  mainInv: controller.mainInv,
  crystalInv: controller.crystalInv,
  mainTrades: controller.mainTrades
}

data.mainInv.addItems(new Array({
  type:AllItems.items[ItemNames.PineWood],amount:1},
  {type:AllItems.items[ItemNames.CopperCoin],amount:10}));
data.crystalInv.setItems(new Array({type:AllItems.items[ItemNames.RedCrystal],amount:1}));
data.mainTrades.addTrade(AllTrades.items[TradeName.BuyPine]);
data.mainTrades.addTrade(AllTrades.items[TradeName.SellPine]);
console.log(controller);
</script>

<template>
  <GameContainer>
    <InventoryTab :main-inv="controller.mainInv" :crys-inv="controller.crystalInv"></InventoryTab>
    <TradingTab :main-trades="controller.mainTrades" :controller="controller"></TradingTab>
  </GameContainer>
</template>

<style scoped>
</style>
