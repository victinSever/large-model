import Http from '@/utils/axios';
import { MessageRes, ChannelModel, TextParam, TextModel, OptimizationParam, OptimizationModel } from '@/type/index';

//获取下发渠道和应用场景接口
export const getChannel = () => {
  // const data = {
  //   "code": 200,
  //   "message": "请求成功",
  //   "data": {
  //     "channel": [
  //       {
  //         "id": 4,
  //         "channelName": "端外push"
  //       },
  //       {
  //         "id": 15,
  //         "channelName": "端内push"
  //       },
  //       {
  //         "id": 16,
  //         "channelName": "短信"
  //       },
  //       {
  //         "id": 17,
  //         "channelName": "服务号模版消息"
  //       },
  //       {
  //         "id": 18,
  //         "channelName": "小程序订阅消息"
  //       },
  //       {
  //         "id": 19,
  //         "channelName": "支付宝小程序"
  //       },
  //       {
  //         "id": 20,
  //         "channelName": "司机播报"
  //       }
  //     ],
  //     "scene": [
  //       {
  //         "id": 1,
  //         "sceneName": "通用"
  //       },
  //       {
  //         "id": 2,
  //         "sceneName": "促销营销"
  //       },
  //       {
  //         "id": 3,
  //         "sceneName": "节日祝福"
  //       },
  //       {
  //         "id": 4,
  //         "sceneName": "活动邀请"
  //       },
  //       {
  //         "id": 5,
  //         "sceneName": "售后服务"
  //       }
  //     ]
  //   }
  // }
  // return new Promise((r) => {
  //   setTimeout(() => {
  //     r(data)
  //   }, 500);
  // });
  return Http.get<MessageRes<ChannelModel>>('/getChannelScene');
};

//智能生成文案接口
export const createText = (params: TextParam) => {
  //   const data = {
  //     "code": 200,
  //     "message": "请求成功",
  //     "data": {
  //         "createMsg": [
  //             "滴滴出行红包大派送，抢不停！",
  //             "滴滴出行，领取红包，轻松省钱！",
  //             "滴滴出行，抢红包啦！快来领取你的专属红包，享受出行优惠！",
  //             "滴滴出行，抢红包啦！最高可得10元，让你轻松出行，赶紧下载体验吧！"
  //         ]
  //     }
  // }
  //   return new Promise((r) => {
  //     setTimeout(() => {
  //       r(data)
  //     }, 500);
  //   });
  return Http.post<MessageRes<TextModel>>('/create', { ...params });
};

// 文案优化接口
export const getOptimization = (params: OptimizationParam) => {
  //   const data = {
  //     "code": 200,
  //     "message": "请求成功",
  //     "data": {
  //         "suggestion": "建议：从用户的真实场景出发，让红包在用户的实际出行中使用起来。例如，可以使用红包买打车券、抵扣券等，也可以让用户在出行中享受到额外的优惠。此外，可以结合节假日、特殊主题等场景，设计不同的红包活动，增加活动的多样性和吸引力。",
  //         "answer": "滴滴出行红包大派送，抢不停！\n\n1. 创意性优化：滴滴出行，送你一路红包，让你一路畅爽！\n2. 多样性优化： 滴滴出行， 每天多个时间段抢红包，多笔订单更优惠！滴滴红包，周末大派送，让你红包拿到手软！快来试试滴滴出行的惊喜红包吧！"
  //     }
  // }
  //   return new Promise((r) => {
  //     setTimeout(() => {
  //       r(data)
  //     }, 500);
  //   });
  return Http.post<MessageRes<OptimizationModel>>('/optimization', { ...params });
};
