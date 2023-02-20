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
            getTradeProgress(index:number): number{
                const trade = this.getTrade(index)
                return trade.progress / GameController.mainTrades.getTradeTime(trade) * 100
            },
            canTrade(index:number): boolean{
                const trade = this.getTrade(index);
                return trade.exchanger.canExchange();
            },
        },
    })
</script>

<template>
    <div class="flex flex-col m-2 h-full p-0.5 w-[17rem]">
        <div class="bg-white w-64 py-3 outline outline-4 outline-black mb-3">Trading Post</div>
        <div class="flex flex-col h-full pl-1 overflow-y-auto overflow-x-hidden w-[17rem]">
            <div class="flex mt-1.5 flex-col bg-white w-[16rem] h-fit text-left outline outline-4 outline-black" v-for="item, index in GameController.mainTrades.getTrades()">
                <pre :class="{'bg-neutral-300':!this.canTrade(index)}" @click="GameController.mainTrades.makeTrade(index)">{{item}}</pre>
                <div class="w-full bg-gray-400 h-2.5">
                    <div class="bg-blue-600 h-2.5" :style="{width:this.getTradeProgress(index)+'%'}"></div>
                </div>
            </div>
        </div>
    </div>
</template>