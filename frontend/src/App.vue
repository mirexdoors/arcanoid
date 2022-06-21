<template>
  <div class="app">
    <ArcAuth
        v-if="isLogged"
        class="app__auth"
    />
    <ArcCanvas v-else/>
  </div>

</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import ArcAuth from '@/components/ArcAuth.vue';
import { useStore } from '@/store';
import ArcCanvas from '@/components/ArcCanvas.vue';
import { GET_ME } from '@/store/action.types';

export default defineComponent({
  name: 'App',
  components: { ArcCanvas, ArcAuth },
  setup () {
    const store = useStore();
    const init = () => store.dispatch(GET_ME);
    onMounted(init);
    return { isLogged: computed(() => store.state.isLogged) }
  }
})
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
</style>
