<script setup lang = "ts">
import { defineComponent } from 'vue';
import {GameController} from '../scripts/GameController';
import { ToolItem } from '../scripts/tools/toolItem';
</script>

<script lang="ts">
    export default defineComponent({
        methods:{
            equip(index: number){
                const toEquip = GameController.toolInv.items[index] as ToolItem;
                GameController.mainEquip.equipTool(toEquip);
                GameController.toolInv.loseTool(index);
            }
        },
    })
</script>



<template>
    <div class="flex flex-col w-[40.5rem] p-1 m-2">
        <div class="bg-white w-72 h-14 outline outline-4 outline-black pt-3 mb-3">Tool Inventory</div>
        <div class="grid grid-cols-4 gap-y-3 overflow-y-auto ">        
            <div @dblclick="equip(index)" class="bg-white w-36 h-fit outline outline-4 outline-black my-1 mx-1 pt-3 px-1" v-for="item, index in GameController.toolInv.getDisplay()" :key="item.id">
                {{item.display}}
                <div class="w-full bg-gray-400 h-2.5">
                    <div class="bg-lime-500 h-2.5" :style="{width:item.durabilityPercent+'%'}"></div>
                </div>
            </div>
        </div>
    </div>
</template>