<script setup lang="ts">
import { copy } from '@/utils/tool';
import { ElNotification } from 'element-plus';

defineProps<{
  texts?: string[];
  textTitle: string;
  isUpdate: boolean;
}>();
const emit = defineEmits(['updateText']);

const update = (isUsual?: boolean) => {
  emit('updateText', isUsual);
};
const unFullfill = () => {
  ElNotification.warning('接口暂未实现~！');
};
</script>

<template>
  <div v-if="texts?.length !== 0" class="scene">
    <div class="header-scene">
      <span class="title">{{ textTitle || 'xxxx' }}</span>
      <span class="change" @click="update(textTitle === '通用')">换一批</span>
    </div>
    <div class="main-scene">
      <div v-for="item in texts" :key="item" class="text-item">
        <el-card class="text-box" shadow="hover">
          <p class="text-content">{{ item }}</p>
          <div class="btns">
            <el-tag style="margin-right: 20px" @click="copy(item)">复制文案</el-tag>
            <el-tag type="danger" @click="unFullfill">不满意</el-tag>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scene {
  margin-bottom: 50px;

  .header-scene {
    height: 50px;
    display: flex;
    justify-content: space-between;
    .change {
      cursor: pointer;
      color: #777;
      &:hover {
        color: skyblue;
      }
    }
  }

  .main-scene {
    display: flex;
    flex-wrap: wrap;

    .text-item {
      flex: 1 1 320px;
      margin-bottom: 30px;

      .text-box {
        margin: 0 20px;
        border-radius: 20px;

        .text-content {
          white-space: break-spaces;
        }

        .btns {
          margin-top: 10px;
          .el-tag {
            cursor: pointer;
            &:hover {
              opacity: 0.8;
            }
          }
        }
      }
    }
  }
}
</style>
