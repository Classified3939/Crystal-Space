<script lang="ts">
    import { defineComponent } from 'vue';
    import {GameController} from "../scripts/GameController"
    export default defineComponent({
        methods:{
            refresh: function(index: number){
               GameController.mainTrades.makeTrade(index)
            }
        },
        data(){
            return{
                GameController
            }
        }
    })
</script>
<template>
    <div class="flex flex-col m-2">
        <div class="bg-white w-64 h-14 pt-3 outline outline-4 outline-black mb-5">Trading Post</div>
        <div class="bg-white w-64 h-fit text-left outline outline-4 outline-black" v-for="item, index in GameController.mainTrades.getTrades()">
            <pre @click="refresh(index)">{{item}}</pre>
        </div>
    </div>
</template>