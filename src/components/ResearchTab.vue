<script setup lang="ts">
    import { BasicResearch } from 'src/scripts/research/basicResearch';
import { defineComponent } from 'vue';
    import {GameController} from "../scripts/GameController"
</script>

<script lang="ts">
    export default defineComponent({
        methods:{
            getResearch(index:number): BasicResearch{
                return GameController.mainResearch.availableResearches[index]
            },
            getResearchProgress(index:number): number{
                const research = this.getResearch(index)
                return research.progress / research.toComplete * 100
            },
            canResearch(index:number): boolean{
                const research = this.getResearch(index);
                return research.exchanger.canExchange();
            },
        },
    })
</script>

<template>
    <div class="flex flex-col m-2 h-full p-0.5 w-[17rem]">
        <div class="bg-violet-400 w-64 py-3 outline outline-4 outline-black mb-3">Research</div>
        <div class="flex flex-col h-full pl-1 overflow-y-auto overflow-x-hidden w-[17rem]">
            <div class="flex mt-1.5 flex-col bg-white w-[16rem] h-fit text-left outline outline-4 outline-black" v-for="item, index in GameController.mainResearch.getDisplay()">
                <pre :class="{'bg-neutral-300':!canResearch(index)}" @click="GameController.mainResearch.doResearch(index)">{{item}}</pre>
                <div class="w-full bg-gray-400 h-2.5">
                    <div class="bg-blue-600 h-2.5" :style="{width:getResearchProgress(index)+'%'}"></div>
                </div>
            </div>
        </div>
    </div>
</template>