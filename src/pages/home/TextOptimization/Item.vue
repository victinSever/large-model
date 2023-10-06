<script setup lang="ts">
import { ElNotification } from 'element-plus';
import { copy } from '@/utils/tool';
defineProps<{
  value?: string;
  text: string;
}>();

const unFullfill = () => {
  ElNotification.warning('接口暂未实现~！');
};
</script>

<template>
  <div class="container">
    <div class="top">
      <div class="title">
        <h3>{{ text }}</h3>
      </div>
      <div class="top-btns">
        <el-tag style="margin-right: 20px" @click="copy(value || '')">复制文案</el-tag>
        <el-tag type="danger" @click="unFullfill">不满意</el-tag>
      </div>
    </div>
    <p class="bottom">{{ value }}</p>
  </div>
</template>

<style scoped lang="scss">
.top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  .top-btns {
    .el-tag {
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}

.bottom {
  white-space: break-spaces;
}
</style>
