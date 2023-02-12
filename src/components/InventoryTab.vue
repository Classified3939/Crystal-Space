<script lang="ts">
    import { defineComponent, PropType, reactive, ref } from 'vue';
    import { Inventory } from '../scripts/inventory';
    export default defineComponent({
            props: {
                mainInv: {type: Object as PropType<Inventory>, required:true},
                crysInv: {type: Object as PropType<Inventory>,required:true},
            },
            mounted(){
                ref(this.mainInv.displayListings);
                ref(this.crysInv.displayListings);
            }
        })
</script>
<template>
    <div class="flex flex-col m-2">
        <div class="bg-white w-36 h-14 outline outline-4 outline-black pt-3">Inventory</div>
        <div class="bg-purple-300 w-36 h-14 outline outline-4 outline-black mt-5">Mundane</div>
        <div class="bg-white w-36 h-14 outline outline-4 outline-black pt-1" v-for="item in mainInv.displayListings" :key="item.id">
            {{item.display}}
        </div>
        <div class="bg-purple-300 w-36 h-14 outline outline-4 outline-black mt-5">Crystals</div>
        <div class="bg-white w-36 h-14 outline outline-4 outline-black pt-1" v-for="item in crysInv.displayListings" :key='item.id'>
            {{item.display}}
        </div>
    </div>
</template>