<script setup lang="ts">
import GameContainer from "./components/GameContainer.vue"
import InventoryTab from "./components/InventoryTab.vue";
import TradingTab from "./components/TradingTab.vue";
import CraftingTab from "./components/CraftingTab.vue";
import ActionsTab from "./components/ActionsTab.vue";
</script>

<template>
  <GameContainer>
    <InventoryTab></InventoryTab>
    <TradingTab></TradingTab>
    <CraftingTab></CraftingTab>
    <ActionsTab></ActionsTab>
  </GameContainer>
</template>

<style scoped>
</style>
