<script setup lang="ts">
import { ref } from 'vue';

const activeIndex = ref('intel-generation');
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<template>
  <el-card>
    <div class="container-header">
      <div class="header-icon">
        <span>大模型设计</span>
      </div>
      <div class="header-nav">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="intel-generation">智能生成</el-menu-item>
          <el-menu-item index="text-optimization">文案优化</el-menu-item>
          <el-menu-item index="model-experience">模型体验</el-menu-item>
          <el-menu-item index="illustrate">说明</el-menu-item>
          <!-- <el-menu-item></el-menu-item> -->
        </el-menu>
      </div>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.el-card {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
:deep(.el-card__body) {
  padding: 0;
}
.container-header {
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  box-shadow: inset;

  .header-icon {
    margin-right: 3rem;
    margin-left: 50px;

    span {
      font-family: 'kaiti';
      font-size: 1.5rem;
    }
  }

  .header-nav {
  }
}
</style>
