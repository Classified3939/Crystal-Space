<script setup lang="ts">
    import { defineComponent } from 'vue';
    import {GameController} from "../scripts/GameController"
    import { ItemCraft } from '../scripts/crafting/itemCraft';
</script>

<script lang="ts">
    export default defineComponent({
        methods:{
            getCraft(index:number): ItemCraft{
                return GameController.mainCrafts.availableCrafts[index]
            },
            getCraftProgress(index:number){
                return this.getCraft(index).progress / GameController.mainCrafts.getCraftTime(this.getCraft(index)) * 100
            }
        },
    })
</script>
<template>
    <div class="flex flex-col m-2 w-64">
        <div class="bg-white w-36 h-14 outline outline-4 outline-black pt-3 w-64">Crafting</div>
        <div class="bg-white mt-1 w-36 h-14 outline outline-4 outline-black pt-1 h-fit w-64" v-for="item, index in GameController.mainCrafts.getCrafts()">
            <pre @click="GameController.mainCrafts.makeCraft(index)">{{item}}</pre>
            <div class="w-full bg-gray-400 h-2.5">
                <div class="bg-blue-600 h-2.5" :style="{width:this.getCraftProgress(index)+'%'}"></div>
            </div>
        </div>
    </div>
</template>