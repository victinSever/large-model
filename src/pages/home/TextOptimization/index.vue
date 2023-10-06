<script setup lang="ts">
import { ref } from 'vue';
import { ElNotification } from 'element-plus';
import { Loading } from '@element-plus/icons-vue';
import { getOptimization } from '@/apis/index';
import Item from './Item.vue';

const input = ref('');
const loading = ref(false);
const suggestion = ref('');
const answer = ref('');

const makeOptimization = async () => {
  loading.value = true;
  const res = await getOptimization({
    question: input.value,
  }).catch((err) => {
    ElNotification.error(err);
    loading.value = false;
  });
  loading.value = false;
  if (res) {
    const { data } = res.data;
    suggestion.value = data.suggestion;
    answer.value = data.answer;
  }
};

const submit = () => {
  if (!input.value.trim()) return ElNotification.warning('还未输入文案');
  makeOptimization();
};

const reset = () => {
  input.value = '';
  suggestion.value = '';
  answer.value = '';
};
</script>

<template>
  <div class="container">
    <el-card class="bgc">
      <el-input
        v-model="input"
        type="textarea"
        :autosize="{ minRows: 8, maxRows: 10 }"
        :row="10"
        placeholder="输入或粘贴一段文案"
      >
      </el-input>
      <div class="btns">
        <el-button type="primary" :icon="loading && Loading" @click="submit">优化</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </el-card>
    <el-card class="suggestion">
      <Item v-if="!loading" text="优化建议" :value="suggestion" />
      <el-skeleton v-else></el-skeleton>
    </el-card>
    <el-card class="answer">
      <Item v-if="!loading" text="优化结果" :value="answer" />
      <el-skeleton v-else></el-skeleton>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.container {
  margin: 20px 0;

  .bgc {
    background: url(@/assets/images/60fd1fd7-4ffa-4bab-b607-69198accaaf5.png) no-repeat;
    background-size: cover;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;

    .el-button {
      border-radius: 10px;
    }
  }

  .suggestion,
  .answer {
    margin-top: 20px;
    border-radius: 30px;
    min-height: 200px;
    background: url(@/assets/images/60fd1fd7-4ffa-4bab-b607-69198accaaf5.png) no-repeat;
    background-size: cover;

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
  }
}
</style>
