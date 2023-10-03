<script setup lang="ts">
import Header from '@/components/header/index.vue';
</script>

<template>
  <div class="home">
    <Header />
    <main>
      <router-view v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>
  </div>
</template>

<style scoped lang="scss">
.home {
  background-color: $theme-color;
}
main {
  padding: 0 50px;
}
</style>
