<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        name: "Tab",
        props: ["index"],
    });
</script>

<template>
    <slot></slot>
</template>