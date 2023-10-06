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
        <span>MagicCreator</span>
      </div>
      <div class="header-nav">
        <el-menu :default-active="activeIndex" router class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="intel-generation">智能生成</el-menu-item>
          <el-menu-item index="text-optimization">文案优化</el-menu-item>
          <!-- <el-menu-item @click="open">模型体验</el-menu-item> -->
          <el-menu-item>
            <template #title>
              <a class="link" href="https://53r23232p6.goho.co" target="myIframe">
                <span>模型体验</span>
              </a>
              <!-- <span  v-if="targeLink(item.path)" class="icon link"  :class="item.meta.linkIcon"></span> -->
            </template>
          </el-menu-item>

          <el-menu-item index="illustrate">说明</el-menu-item>
          <el-menu-item index="illustrate">说明</el-menu-item>
          <el-menu-item index="illustrate">说明</el-menu-item>
        </el-menu>
      </div>
    </div>
    <!-- <iframe src="https://53r23232p6.goho.co" frameborder="0" name="myIframe"></iframe> -->
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
