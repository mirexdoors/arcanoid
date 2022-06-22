<template>
  <form
    class="arc-auth"
    @submit.prevent="handleSubmit"
  >
    <ArcTitle>
      Авторизация
    </ArcTitle>
{{ login }} -- {{ password }}
    <ArcInput
        placeholder="Логин"
        @input="alert('ss')"
    />
    <ArcInput
        v-model="password"
        type="password" placeholder="Пароль"
    />
    <ArcButton type="submit">
      Войти
    </ArcButton>
  </form>
</template>

<script lang="ts">
import ArcInput from '@/components/common/ArcInput.vue';
import { defineComponent, ref } from 'vue';
import type { Ref } from 'vue';
import ArcTitle from '@/components/common/ArcTitle.vue';
import ArcButton from '@/components/common/ArcButton.vue';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/action.types';

export default defineComponent({
  name: 'ArcAuth',
  components: { ArcInput, ArcTitle, ArcButton },
  setup () {
    const login: Ref<string> = ref('');
    const password: Ref<string> = ref('');

    const store = useStore();

    const handleSubmit = () => {
      const credentials = {};
      store.dispatch(ActionTypes.LOGIN, credentials);
    };

    return { handleSubmit, login, password }
  }
});
</script>

<style>
.arc-auth {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  align-items: center;
}
</style>
