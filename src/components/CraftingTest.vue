<script setup lang="ts">
import FloatingVue from 'floating-vue'
import { defineComponent, ref } from 'vue';
import { GameController } from '../scripts/GameController';
import { AllTools, MaterialNames } from '../scripts/tools/allTools';
import { ToolMaterial, ToolModifier, ToolType } from '../scripts/tools/toolItem';
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
</script>

<script lang="ts">
    export default defineComponent({
        methods:{
            getMaterial(mat: object){
                return mat as ToolMaterial;
            },
            getTool(tool: object){
                return tool as ToolType;
            }
        },
    })
</script>

<template>
    <div class="flex flex-col m-2 p-1 w-[16.5rem] overflow-y-auto h-full">
        <div class="bg-white h-fit outline outline-4 outline-black py-3 w-64 mb-3">Crafting</div>
        <div class="flex flex-row">
            <div class="bg-purple-300 h-fit outline outline-4 outline-black py-1 w-24">Material</div>
            <div class="bg-purple-300 h-fit outline outline-4 outline-black py-1 ml-16 w-24">Type</div>
        </div>
        <div class="flex flex-row">
        <!--MATERIAL CHOOSER-->
            <VDropdown class="bg-amber-300 h-fit outline outline-4 outline-black my-1 w-24">
        <!-- This will be the popover reference (for the events and position) -->
        <button class="w-full h-full">{{GameController.newCrafts.chosenMaterial.display}}</button>
        <!-- This will be the content of the popover -->
        <template #popper>
            <div class="flex flex-col">
                <div class="px-3 py-1" @click="GameController.newCrafts.setMaterial(getMaterial(material))" v-for="material, index in AllTools.materials" :key="index">{{ getMaterial(material).display}}</div>
            </div>
        </template>
        </VDropdown>
        <!--TOOL TYPE CHOOSER-->
        <VDropdown class="bg-amber-300 h-fit outline outline-4 outline-black my-1 w-24 ml-16">
        <!-- This will be the popover reference (for the events and position) -->
        <button class="w-full h-full">{{GameController.newCrafts.chosenType.display}}</button>
        <!-- This will be the content of the popover -->
        <template #popper>
            <div class="flex flex-col">
                <div class="px-3 py-1" @click="GameController.newCrafts.setType(getTool(tool))" v-for="tool, index in AllTools.tools" :key="index">{{ getTool(tool).display}}</div>
            </div>
        </template>
        </VDropdown>
        </div>
        <div class="bg-purple-300 h-fit outline outline-4 outline-black py-1 ml-[4rem] mt-4 w-32">Modifier</div>
        <!--TOOL TYPE CHOOSER-->
        <VDropdown class="bg-amber-300 h-fit outline outline-4 outline-black my-1 w-32 ml-[4rem]">
        <!-- This will be the popover reference (for the events and position) -->
        <button class="w-full h-full">{{GameController.newCrafts.chosenModifier}}</button>
        <!-- This will be the content of the popover -->
        <template #popper>
            <div class="flex flex-col">
                <div class="px-3 py-1" @click="GameController.newCrafts.setModifier(modifier)" v-for="modifier, index in ToolModifier" :key="index">{{modifier}}</div>
            </div>
        </template>
        </VDropdown>
        <pre @click="GameController.newCrafts.craftTool()" class="bg-purple-300 h-fit outline outline-4 outline-black mt-4 py-1 w-64">{{GameController.newCrafts.getDisplay()}}</pre>
    </div>
</template>