const routes = [
  {
    path: '/',
    redirect: '/home/intel-generation',
  },
  {
    path: '/home',
    component: () => import('@/pages/home/index.vue'),
    redirect: '/home/intel-generation',
    children: [
      {
        path: '/home/intel-generation',
        component: () => import('@/pages/home/IntelGeneration/index.vue'),
        meta: {
          title: '智能生成',
        },
      },
      {
        path: '/home/text-optimization',
        component: () => import('@/pages/home/TextOptimization/index.vue'),
        meta: {
          title: '文案优化',
        },
      },
      {
        path: '/home/illustrate',
        component: () => import('@/pages/home/Illustrate/index.vue'),
        meta: {
          title: '说明',
        },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/pages/404/index.vue'),
  },
];

export default routes;
