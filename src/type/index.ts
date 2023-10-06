export interface MessageRes<T> {
  code: number;
  message: string;
  data: T;
}

export interface ChannelRowItem {
  id: number;
  channelName: string;
}

export interface SceneRowItem {
  id: number;
  sceneName: string;
}

export interface ChannelModel {
  channel: ChannelRowItem[];
  scene: SceneRowItem[];
}

export interface TextParam {
  channelName: string;
  sceneName: string;
  keyWord: string[];
  feature: string;
}

export interface TextModel {
  createMsg: string[];
}

export interface OptimizationParam {
  question: string; // 文案内容
}

export interface OptimizationModel {
  suggestion: string;
  answer: string;
}
