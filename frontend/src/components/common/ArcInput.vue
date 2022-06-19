<template>
  <input
    :type="type"
    class="arc-input"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ArcInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    }
  }
});
</script>

<style>
.arc-input {
  height: 24px;
  padding: 8px 16px;
}
</style>
