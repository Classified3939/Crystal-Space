<script setup lang="ts">
    import { defineComponent } from 'vue';
    import { ManualAction } from '../scripts/actions/manualAction';
    import {GameController} from "../scripts/GameController"
</script>

<script lang="ts">
    export default defineComponent({
        methods:{
            getAction(index:number): ManualAction{
                return GameController.mainActions.manualActions[index];
            },
            getActionProgress(index:number){
                const action = this.getAction(index);
                return action.progress / GameController.mainActions.getActionTime(this.getAction(index)) * 100
            },
        },
    })
</script>
<template>
    <div class="flex flex-col m-2 w-[18.5rem] p-1 overflow-y-auto h-full">
        <div class="bg-white w-64 h-fit outline outline-4 outline-black py-3 w-72 mb-3.5">Actions</div>
        <div :class="{'hidden':!GameController.mainActions.hasActionTool(index) && this.getAction(index).progress === 0}" class="bg-white mt-1 w-72 h-14 outline outline-4 outline-black h-fit" v-for="item, index in GameController.mainActions.getActions()">
            <pre :class="{'bg-neutral-300':!GameController.mainActions.canDoAction(getAction(index))}"  @click="GameController.mainActions.doAction(index)">{{item}}</pre>
            <div class="w-full bg-gray-400 h-2.5">
                <div class="bg-blue-600 h-2.5" :style="{width:this.getActionProgress(index)+'%'}"></div>
            </div>
        </div>
    </div>
</template>