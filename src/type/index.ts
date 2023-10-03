export interface ChannelRowItem {
  id: number;
  channelName: string;
}

export interface SceneRowItem {
  id: number;
  channelName: string;
}

export interface ChannelModel {
  code: number;
  message: string;
  data: {
    channel: ChannelModel[];
    scene: SceneRowItem[];
  };
}

export interface TextParam {
  channelName: string;
  sceneName: string;
  keyWord: string[];
  feature: string;
}

export interface TextModel {
  code: number;
  message: string;
  data: {
    createMsg: string[];
  };
}

export interface OptimizationParam {
  question: string; // 文案内容
}

export interface OptimizationModel {
  code: number;
  message: string;
  data: {
    suggestion: string;
    answer: string;
  };
}
