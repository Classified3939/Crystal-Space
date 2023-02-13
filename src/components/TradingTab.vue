<script setup lang="ts">
    import { defineComponent } from 'vue';
    import {GameController} from "../scripts/GameController"
    import { ItemTrade } from '../scripts/trading/itemTrade';
</script>

<script lang="ts">
    export default defineComponent({
        methods:{
            getTrade(index:number): ItemTrade{
                return GameController.mainTrades.availableTrades[index]
            },
            getTradeProgress(index:number){
                return this.getTrade(index).progress / GameController.mainTrades.getTradeTime(this.getTrade(index)) * 100
            }
        },
    })
</script>

<template>
    <div class="flex flex-col m-2">
        <div class="bg-white w-64 h-14 pt-3 outline outline-4 outline-black mb-5">Trading Post</div>
        <div class="flex mt-1 flex-col bg-white w-64 h-fit text-left outline outline-4 outline-black" v-for="item, index in GameController.mainTrades.getTrades()">
            <pre @click="GameController.mainTrades.makeTrade(index)">{{item}}</pre>
            <div class="w-full bg-gray-400 h-2.5">
                <div class="bg-blue-600 h-2.5" :style="{width:this.getTradeProgress(index)+'%'}"></div>
            </div>
        </div>
    </div>
</template>