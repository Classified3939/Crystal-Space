<script setup lang = "ts">
import { InfoType } from '../scripts/infobox/allInfo';
import { defineComponent } from 'vue';
import {GameController} from '../scripts/GameController';

</script>

<script lang="ts">
    export default defineComponent({
        methods:{
            getColor(type: InfoType){
                if (type === InfoType.Story){
                    return "bg-sky-200";
                }
                else if (type === InfoType.Error){
                    return "bg-rose-200";
                }
            }
        },
    })
</script>



<template>
    <div class="m-2">
    <div :class="{'bg-rose-400':GameController.infoBox.newInfo,'bg-violet-400':!GameController.infoBox.newInfo}" class="w-[29.5rem] h-fit outline outline-4 outline-black py-3">Info</div>
        <div class="flex flex-col h-[15rem] overflow-y-auto overflow-x-hidden p-1 gap-2 my-2 mr-2">
            <p :class="{'bg-sky-200':item.type === InfoType.Story,'bg-rose-200':item.type === InfoType.Error}" v-html="item.display" class="w-[29rem] h-min outline outline-4 outline-black p-1" v-for="item in GameController.infoBox.infoShown"></p>
        </div>
    </div>
</template>