import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Leads',
    component: () => import('../views/TheMainView.vue')
  },
  {
    path: '/create',
    name: 'CreateLead',
    component: () => import('../views/TheLeadsCreateView.vue')
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
