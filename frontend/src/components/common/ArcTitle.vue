<template>
  <h2 class="arc-title">
    <slot/>
  </h2>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ArcTitle'
});
</script>
