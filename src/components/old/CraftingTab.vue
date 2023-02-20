<script setup lang="ts">
    import { defineComponent } from 'vue';
    import {GameController} from "../scripts/GameController"
    import { ItemCraft } from '../scripts/crafting/old/itemCraft';
</script>

<script lang="ts">
    /*export default defineComponent({
        methods:{
            getCraft(index:number): ItemCraft{
                return GameController.mainCrafts.availableCrafts[index]
            },
            getCraftProgress(index:number){
                return this.getCraft(index).progress / GameController.mainCrafts.getCraftTime(this.getCraft(index)) * 100
            },
            canCraft(index:number): boolean{
                const craft = this.getCraft(index);
                return craft.exchanger.canExchange();
            }
        },
    })*/
</script>
<!--<template>
    <div class="flex flex-col m-2 p-1 w-[16.5rem] overflow-y-auto h-full">
        <div class="bg-white w-36 h-fit outline outline-4 outline-black py-3 w-64 mb-3">Crafting</div>
        <div class="bg-white mt-1.5 w-36 h-fit outline outline-4 outline-black h-fit w-64" v-for="item, index in GameController.mainCrafts.getCrafts()">
            <pre :class="{'bg-neutral-300':!this.canCraft(index)}" @click="GameController.mainCrafts.makeCraft(index)">{{item}}</pre>
            <div class="w-full bg-gray-400 h-2.5">
                <div class="bg-blue-600 h-2.5" :style="{width:this.getCraftProgress(index)+'%'}"></div>
            </div>
        </div>
    </div>
</template>-->