<template>
  Авторизация
  <ArcInput />
  <ArcInput />
</template>

<script lang="ts">
import ArcInput from '@/components/common/ArcInput.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ArcAuth',
  components: { ArcInput },
});
</script>
