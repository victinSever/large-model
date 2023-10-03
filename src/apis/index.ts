import Http from '@/utils/axios';
import { ChannelModel, TextParam, TextModel, OptimizationParam, OptimizationModel } from '@/type/index';

//获取下发渠道和应用场景接口
export const getChannel = () => {
  return Http.get<ChannelModel>('/getChannel');
};

//智能生成文案接口
export const createText = (params: TextParam) => {
  return Http.post<TextModel>('/create', { params });
};

// 文案优化接口
export const getOptimization = (params: OptimizationParam) => {
  return Http.post<OptimizationModel>('/optimization', { params });
};
