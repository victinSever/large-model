<script setup lang="ts">
import { ref, reactive, toRaw, onMounted } from 'vue';
import type { FormInstance } from 'element-plus';
import { ElNotification } from 'element-plus';
import lang from '@/lang/index';
import SceneText from './SceneText/index.vue';
import ContentMark from './ContentMark/index.vue';
import { Plus, Close } from '@element-plus/icons-vue';
import { createText, getChannel } from '@/apis/index';
import { ChannelRowItem, SceneRowItem } from '@/type/index';

interface FormProps {
  channel: string;
  scene: string;
  group: string;
  keyword: string;
  keywords: string[];
}
const formRef = ref<FormInstance>();
const form = reactive<FormProps>({
  channel: '',
  scene: '通用',
  group: '',
  keyword: '',
  keywords: [],
});

const channels = ref<ChannelRowItem[]>();
const scenes = ref<SceneRowItem[]>();
const tabs = lang.tabs;
const isSubmit = ref(false);
const isLoading = ref(false);
const tab = ref('场景化文案');
const sceneTexts = ref<string[]>([]);
const usualTexts = ref<string[]>([]);
const sceneTitle = ref('通用');

onMounted(() => getChannels());

const getChannels = async () => {
  const res = await getChannel().catch((err) => {
    ElNotification.error(err);
  });
  if (res) {
    const {
      data: { channel, scene },
    } = res.data;
    channels.value = channel;
    scenes.value = scene;
  }
};

const updateText = async (isUsual?: boolean) => {
  isSubmit.value = true;
  isLoading.value = true;
  sceneTitle.value = form.scene;
  const res = await createText({
    channelName: form.channel,
    sceneName: isUsual ? '通用' : form.scene,
    keyWord: form.keywords,
    feature: form.group,
  }).catch((err) => {
    ElNotification.error(err);
    isLoading.value = false;
  });
  isLoading.value = false;
  if (res) {
    const { data } = res.data;
    if (isUsual) {
      usualTexts.value = data.createMsg;
    } else {
      sceneTexts.value = data.createMsg;
    }
  }
};

const updateTwoText = async () => {
  isSubmit.value = true;
  isLoading.value = true;
  sceneTitle.value = form.scene;
  const datas = {
    channelName: form.channel,
    sceneName: form.scene,
    keyWord: form.keywords,
    feature: form.group,
  };
  const res = await Promise.all([createText(datas), createText({ ...datas, sceneName: '通用' })]).catch((err) => {
    ElNotification.error(err);
    isLoading.value = false;
  });
  isLoading.value = false;
  if (res && res instanceof Array && res.length === 2) {
    const { data: data1 } = res[0].data;
    sceneTexts.value = data1.createMsg;
    const { data: data2 } = res[1].data;
    usualTexts.value = data2.createMsg;
  }
};

const validate = () => {
  if (!form.channel.trim()) return ElNotification.warning('需要选择渠道');
  if (!form.scene.trim()) return ElNotification.warning('需要选择场景');
  if (!form.group.trim()) return ElNotification.warning('需要填写特征人群');
  return true;
};

const onSubmit = async () => {
  if (typeof validate() === 'boolean') {
    if (form.scene === '通用') {
      updateText(true);
    } else {
      updateTwoText();
    }
  }
};

const onReset = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  form.keywords = [];
  isSubmit.value = false;
};

const keywordDown = () => {
  const toRefForm = toRaw(form);
  if (form.keywords.findIndex((v) => toRefForm.keyword === v) !== -1) return ElNotification.error('关键字重复！');
  form.keywords.push(toRefForm.keyword);
  form.keyword = '';
};

const handleDeleteKeyword = (keyword: string) => {
  form.keywords = form.keywords.filter((text) => keyword !== text);
};
</script>

<template>
  <el-card class="inter-container">
    <div class="container-header">
      <h3 style="font-size: 1.5rem">智能生成</h3>
      <p style="margin-bottom: 20px; color: #777">一键生成营销文案 电商场景悉数覆盖</p>
    </div>
    <el-card class="form">
      <el-form ref="formRef" :inline="true" :model="form" class="demo-form-inline" label-width="100px">
        <el-row>
          <el-form-item label="下发渠道" prop="channel">
            <el-select v-model="form.channel" placeholder="必选，选择渠道">
              <el-option
                v-for="(item, index) in channels"
                :key="index"
                :label="item.channelName"
                :value="item.channelName"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="应用场景" prop="scene">
            <el-select v-model="form.scene" placeholder="必选，选择场景">
              <el-option v-for="(item, index) in scenes" :key="index" :label="item.sceneName" :value="item.sceneName" />
            </el-select>
          </el-form-item>
          <el-form-item label="特征人群" prop="group">
            <el-input v-model="form.group" type="text" placeholder="必填，输入特征人群" clearable />
          </el-form-item>
          <el-form-item label="关键字设置" prop="keyword">
            <el-input
              v-model="form.keyword"
              :suffix-icon="Plus"
              type="text"
              placeholder="选填，Enter添加关键字"
              clearable
              @keydown.enter="keywordDown"
            />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item style="width: 100%">
            <div class="form-bottom">
              <div class="form-keywords">
                <span v-show="form.keywords.length !== 0" class="keywords-title">关键字：</span>
                <el-tag v-for="item in form.keywords" :key="item" class="keywords-item">
                  <el-text>{{ item }}</el-text>
                  <el-icon class="icon" @click="handleDeleteKeyword(item)">
                    <Close />
                  </el-icon>
                </el-tag>
              </div>
              <div class="form-btns">
                <el-button v-loading="isLoading" type="primary" style="margin-right: 20px" @click="onSubmit"
                  >生成</el-button
                >
                <el-button type="info" @click="onReset(formRef)">重置</el-button>
              </div>
            </div>
          </el-form-item>
        </el-row>
      </el-form>
    </el-card>
    <div v-if="isSubmit" class="container-main">
      <div class="main-tabs">
        <el-radio-group v-model="tab" size="large">
          <el-radio-button v-for="(item, index) in tabs" :key="index" :label="item" />
        </el-radio-group>
      </div>
      <el-card class="main-content">
        <el-skeleton v-if="isLoading" :rows="14" animated></el-skeleton>
        <SceneText
          v-else-if="tab === '场景化文案'"
          :scene-texts="sceneTexts"
          :usual-texts="usualTexts"
          :text-title="sceneTitle"
          :is-update="isSubmit"
          @update-text="updateText"
        />
        <ContentMark v-else />
      </el-card>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.inter-container {
  margin-top: 15px;
  color: #000;
  padding: 100px;
  min-height: 600px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  background: url(@/assets/images/60fd1fd7-4ffa-4bab-b607-69198accaaf5.png) no-repeat;
  background-size: cover;

  .form {
    border-radius: 20px;
    background: url(@/assets/images/60fd1fd7-4ffa-4bab-b607-69198accaaf5.png) no-repeat;
    background-size: cover;

    .form-bottom {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 30px;

      .form-keywords {
        margin-left: 30px;
        max-width: 500px;

        .keywords-title {
          font-size: 0.6em;
          color: #777;
        }

        .keywords-item {
          margin-right: 10px;
          position: relative;

          .icon {
            margin-left: 5px;

            &:hover {
              color: #777;
            }
          }
        }
      }

      .form-btns {
        .el-button {
          padding: 5px 20px;
          border-radius: 15px;
        }
      }
    }
  }

  .container-main {
    margin-top: 100px;
    width: 100%;

    .main-tabs {
      margin-bottom: 50px;
      display: flex;
      justify-content: center;
    }

    .main-content {
      background: url(@/assets/images/60fd1fd7-4ffa-4bab-b607-69198accaaf5.png) no-repeat;
      background-size: cover;
      border-radius: 20px;
    }
  }
}

.demo-form-inline .el-input {
  --el-input-width: 220px;
}
</style>
