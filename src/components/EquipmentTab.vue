<script setup lang = "ts">
import {GameController} from '../scripts/GameController';

</script>



<template>
    <div class="flex flex-col w-[40.5rem] p-1 m-2">
        <pre class="bg-white w-72 h-16 outline outline-4 outline-black py-3 mb-5">{{"Equipped\nSlots: " + GameController.mainEquip.filledSlots + "/" + GameController.mainEquip.slots}}</pre>
        <div class="grid grid-cols-4 gap-y-3 overflow-y-auto ">        
            <div @dblclick="GameController.mainEquip.unequipTool(index)" class="bg-white w-36 h-fit outline outline-4 outline-black my-1 mx-1 pt-3 px-1" v-for="item, index in GameController.mainEquip.getDisplay()" :key="item.id">
                {{item.display}}
                <div class="w-full bg-gray-400 h-2.5">
                    <div class="bg-lime-500 h-2.5" :style="{width:item.durabilityPercent+'%'}"></div>
                </div>
            </div>
        </div>
    </div>
</template>