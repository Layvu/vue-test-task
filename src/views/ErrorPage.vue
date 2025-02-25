<template>
  <q-page class="page">
    <h1 class="page__title">404</h1>
    <h2 class="page__subtitle">Страница не найдена :(</h2>
    <q-btn
      label="Вернуться на главную"
      color="primary"
      size="lg"
      @click="goToMainPage"
      class="page__button"
    />
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToMainPage = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  &__title {
    font-size: 6rem;
    font-weight: bold;
  }

  &__subtitle {
    font-size: 1.5rem;
    margin-top: $spacing-small;
  }

  &__button {
    margin-top: $spacing-large;
  }
}
</style>
