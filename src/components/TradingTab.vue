<script lang="ts">
    import { defineComponent, getCurrentInstance } from 'vue';
    import { GameController } from '../scripts/gameController';
    import { TradeShop } from '../scripts/tradeShop';
    export default defineComponent({
        props: {
            mainTrades: TradeShop,
            controller: GameController,
        },
        methods:{
            refresh: function(index: number){
                this.controller.mainTrades.makeTrade(index)
                this.$forceUpdate;
            }
        }
    })
</script>
<template>
    <div class="flex flex-col m-2">
        <div class="bg-white w-64 h-14 pt-3 outline outline-4 outline-black mb-5">Trading Post</div>
        <div class="bg-white w-64 h-fit text-left outline outline-4 outline-black" v-for="item, index in mainTrades.getTrades()">
            <pre @click="refresh(index)">{{item}}</pre>
        </div>
    </div>
</template>