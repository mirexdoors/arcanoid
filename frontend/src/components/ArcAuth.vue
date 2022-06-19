<template>
  <form
    class="arc-auth"
    @submit.prevent="handleSubmit"
  >
    <ArcTitle>
      Авторизация
    </ArcTitle>

    <ArcInput placeholder="Логин" />
    <ArcInput type="password" placeholder="Пароль" />
    <ArcButton>
      Войти
    </ArcButton>
  </form>
</template>

<script lang="ts">
import ArcInput from '@/components/common/ArcInput.vue';
import { defineComponent } from 'vue';
import ArcTitle from '@/components/common/ArcTitle.vue';
import ArcButton from '@/components/common/ArcButton.vue';

export default defineComponent({
  name: 'ArcAuth',
  components: { ArcInput, ArcTitle, ArcButton },
  setup () {
    const handleSubmit = () => alert('submit');
    return { handleSubmit }
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
