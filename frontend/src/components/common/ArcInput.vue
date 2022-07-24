<template>
  <input
    :value="value"
    :type="type"
    class="arc-input"
    @input="$emit('input', $event)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ArcInput',
  emits: ['input'],
  props: {
    value: {
      type: [String, Number],
      required: true
    },
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
