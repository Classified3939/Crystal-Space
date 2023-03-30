<template>
    <div class="w-[90%]">
      <template v-for="(item) in tabList">
        <div :key="item.index" v-if="item.index === this.index">
            <slot :name="`tabPanel-${item.index}`"></slot>
        </div>
      </template>
    </div>
</template>

<script>
import {computed } from 'vue';

    export default{
        props:{
            tabList:{
                type: Array,
                required: true,
            },
            activeTab:{
                type: Number,
                default: 0
            },
        },

        emits: ["update:active"],

        computed:{
            index(){
                return this.activeTab
            }
        }
    }
</script>