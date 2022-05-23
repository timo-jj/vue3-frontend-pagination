import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'services',
      component: () => import('../views/Services.vue'),
    },
    {
      path: '/service/:id',
      name: 'service',
      component: () => import('../views/Service.vue'),
    },
  ],
})

export default router
