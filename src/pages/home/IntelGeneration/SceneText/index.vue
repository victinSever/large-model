<script setup lang="ts">
import Item from './Item.vue';

defineProps<{
  sceneTexts?: string[];
  usualTexts?: string[];
  textTitle: string;
  isUpdate: boolean;
  loading1: boolean;
  loading2: boolean;
}>();
const emit = defineEmits(['updateText']);

const update = (isUsual?: boolean) => {
  emit('updateText', isUsual);
};
</script>

<template>
  <div class="scene-text-container">
    <Item
      v-if="textTitle !== '通用'"
      :text-title="textTitle"
      :is-update="false"
      :texts="sceneTexts"
      :loading="loading1"
      @update-text="update"
    />
    <Item text-title="通用文案" :is-update="false" :texts="usualTexts" :loading="loading2" @update-text="update" />
  </div>
</template>

<style scoped lang="scss">
.scene-text-container {
  width: 100%;
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
        flex: 1 1 300px;
        height: 80px;
        margin-bottom: 30px;

        .text-box {
          margin: 0 50px;
          border-radius: 20px;

          p {
            // height: 60px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
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
}
</style>
