<script setup lang="ts">
import GameContainer from "./components/GameContainer.vue"
import InventoryTab from "./components/InventoryTab.vue";
import TradingTab from "./components/TradingTab.vue";
import ActionsTab from "./components/ActionsTab.vue";
import ToolInventory from "./components/ToolInventory.vue";
import EquipmentTab from "./components/EquipmentTab.vue";
import CraftingTab from "./components/CraftingTab.vue";
import ResearchTab from "./components/ResearchTab.vue";
import InfoBox from "./components/InfoBox.vue";
import { GameController } from "./scripts/GameController";
</script>

<template>
  <GameContainer>
    <div class="flex flex-row h-[63%]">
      <InventoryTab></InventoryTab>
      <TradingTab></TradingTab>
      <CraftingTab></CraftingTab>
      <ActionsTab></ActionsTab>
      <ResearchTab></ResearchTab>
    </div>
    <div class="h-[37%] flex flex-row">
      <ToolInventory></ToolInventory>
      <EquipmentTab></EquipmentTab>
      <InfoBox></InfoBox>
      <div class="flex flex-col">
        <div class="bg-white h-7 w-[9rem] outline outline-black outline-4 m-2" @click="GameController.save()">Save Game</div>
        <div class="bg-white h-7 w-[9rem] outline outline-black outline-4 m-2" @click="GameController.deleteSave()">Delete Save</div>
      </div>
  </div>
  </GameContainer>
</template>

<style scoped>
</style>
