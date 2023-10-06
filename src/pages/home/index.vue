<script setup lang="ts">
import Header from '@/components/header/index.vue';
// import bgc from "@/assets/images/pexels-aleksandar-pasaric-1323712.jpg";
</script>

<template>
  <div class="home">
    <Header />
    <main>
      <!-- <el-image :src="bgc"></el-image> -->
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
  min-height: calc(100vh - 75px);
  padding: 0 50px;
  background: url(@/assets/images/60fd1fd7-4ffa-4bab-b607-69198accaaf5.png) no-repeat;
  background-size: cover;
}
</style>
