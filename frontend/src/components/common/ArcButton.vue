<template>
  <button
    :type="type"
    class="arc-button"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ArcButton',
  props: {
    type: {
      type: String,
      default: 'button'
    }
  }
});
</script>

<style>
.arc-button {
  font-size: 18px;
  padding: 16px;
  cursor: pointer;
}
</style>
