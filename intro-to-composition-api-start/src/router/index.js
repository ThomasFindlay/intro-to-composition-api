import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Products',
    component: () => import('@/views/product/Products.vue'),
    children: [
      {
        path: ':id',
        name: 'SelectedProduct',
        component: () => import('@/views/product/SelectedProduct.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
