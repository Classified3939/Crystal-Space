<script setup lang="ts">
import GameContainer from "./components/GameContainer.vue"
import InventoryTab from "./components/InventoryTab.vue";
import TradingTab from "./components/TradingTab.vue";
import ActionsTab from "./components/ActionsTab.vue";
import ToolInventory from "./components/ToolInventory.vue";
import EquipmentTab from "./components/EquipmentTab.vue";
import CraftingTab from "./components/CraftingTab.vue";
</script>

<template>
  <GameContainer>
    <div class="flex flex-row h-[63%]">
      <InventoryTab></InventoryTab>
    <TradingTab></TradingTab>
    <CraftingTab></CraftingTab>
    <ActionsTab></ActionsTab>
    </div>
    <div class="h-2/5 flex flex-row">
    <ToolInventory></ToolInventory>
    <EquipmentTab></EquipmentTab>
    </div>
  </GameContainer>
</template>

<style scoped>
</style>
