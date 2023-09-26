import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name:'Home', path: '', component: () => import('pages/IndexPage.vue') },
      { name:'AddContext', path: 'add_context', component: () => import('pages/AddContext.vue') },
      { name:'GetPrompt', path: 'get_prompt', component: () => import('pages/PromptPage.vue') }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
