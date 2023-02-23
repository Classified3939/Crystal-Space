<script setup lang = "ts">
import {GameController} from '../scripts/GameController';

</script>



<template>
    <div class="flex flex-col h-full overflow-y-auto overflow-x-hidden p-1 m-2">
        <div class="bg-violet-400 w-36 h-fit outline outline-4 outline-black py-3 mb-[1.125rem]">Inventory</div>
        <div class="bg-purple-300 w-36 h-14 outline outline-4 outline-black py-3">Mundane</div>
        <div class="bg-white w-36 h-min outline outline-4 outline-black py-3" v-for="item in GameController.mainInv.getDisplay()" :key="item.id">
            {{item.display}}
        </div>
        <div class="bg-purple-300 w-36 h-min outline outline-4 outline-black py-3 mt-5">Crystals</div>
        <div class="bg-white w-36 h-min outline outline-4 outline-black py-3" v-for="item in GameController.crystalInv.getDisplay()" :key='item.id'>
            {{item.display}}
        </div>
    </div>
</template>