<script setup lang="ts">
import { ListboxChangeEvent } from "primevue/listbox";
import { reactive, ref } from "vue";
import GameContainer from "./components/GameContainer.vue";
import TradingPost from "./components/TradingPost.vue";
import TabWindow from "./components/TabWindow.vue";
/*import {useToast} from "primevue/usetoast";

const text = ref();
const toast = useToast();
const greet = () => {
  toast.add({severity:'success',summary:'PRIMETIME',detail:text.value})
};*/
let selectedTab = ref(0)
const tabs = ref([
    { name: 'Trading Post',index:0},
    { name: 'Workers Guild',index:1},
    { name: 'Crafting Station',index:2},
    { name: 'Alchemy Hut',index:3},
    { name: 'Research Institute',index:4},
    { name: 'Adventurers Guild',index:5},
    { name: 'Ritual Circle',index:6},
    { name: 'Shipyard',index:7},
    { name: 'Travel',index:8},
]);

function onTabChange(event: ListboxChangeEvent){
  if (event.value === null) return;
  selectedTab.value = event.value.index;
}
</script>

<template>
  <!--<Toast></Toast>-->
  <GameContainer>
    <div class="flex justify-content-center h-full">
        <Listbox v-model="selectedTab" v-ripple :options="tabs" optionLabel="name" class="p-ripple w-14rem p-1 p-ripple main-list" @change="onTabChange"/>
    </div>
    <TabWindow :tabList="tabs" v-model:activeTab="selectedTab">
      <template v-slot:tabPanel-0><TradingPost></TradingPost></template>
      <template v-slot:tabPanel-1><h1>WORKERS</h1></template>
    </TabWindow>
  </GameContainer>

</template>

<style scoped>
::v-deep(.main-list .p-ink){
  background: rgba(156,39,176,1)
}
</style>
