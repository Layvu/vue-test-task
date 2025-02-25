<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="header">
      <q-toolbar class="header__toolbar">
        <q-btn flat round dense icon="home" to="/" class="header__icon" />
        <q-toolbar-title class="header__title">Weather App</q-toolbar-title>
        <q-tabs v-model="currentTab" class="header__tabs">
          <q-route-tab to="/about" name="about" label="О приложении" class="header__tab" />
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-page-container class="container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentTab = ref('home')
</script>

<style lang="scss" scoped>
.header {
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: $box-shadow;

  &__toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__icon {
    color: $primary-color;
    transition: transform $transition-duration;

    &:hover {
      transform: scale(1.1);
    }
  }

  &__title {
    color: $primary-color;
    font-weight: bold;
    font-size: 20px;
  }

  &__tabs {
    display: flex;
    gap: $spacing-small;
  }

  &__tab {
    color: $primary-color;
    font-size: 14px;
    text-transform: none;
    transition: color $transition-duration;

    &.q-tab--active {
      color: $secondary-color;
    }

    &:hover {
      color: $secondary-color;
    }
  }
}

.container {
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding: $spacing-medium;
}
</style>
