<script setup lang = "ts">
import {GameController} from '../scripts/GameController';

</script>



<template>
    <div class="flex flex-col m-2">
        <div class="bg-white w-36 h-14 outline outline-4 outline-black pt-3 mb-5">Inventory</div>
        <div class="bg-purple-300 w-36 h-14 outline outline-4 outline-black mt-1.5">Mundane</div>
        <div class="bg-white w-36 h-14 outline outline-4 outline-black pt-1" v-for="item in GameController.mainInv.displayListings" :key="item.id">
            {{item.display}}
        </div>
        <div class="bg-purple-300 w-36 h-14 outline outline-4 outline-black mt-5">Crystals</div>
        <div class="bg-white w-36 h-14 outline outline-4 outline-black pt-1" v-for="item in GameController.crystalInv.displayListings" :key='item.id'>
            {{item.display}}
        </div>
    </div>
</template>