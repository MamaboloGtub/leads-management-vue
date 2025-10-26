import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/login-failed',
    name: 'LoginFailed',
    component: () => import('../views/loginFailView.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/',
    name: 'Leads',
    component: () => import('../views/TheMainView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/create',
    name: 'CreateLead',
    component: () => import('../views/TheLeadsCreateView.vue'),
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  authStore.initializeAuth()

  const isAuthenticated = authStore.isAuthenticated
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest)
  const hasLoginFailure = authStore.hasLoginFailure
  if (hasLoginFailure && to.name === 'Login' && from.name === 'Login') {
    next({
      name: 'LoginFailed',
      query: { reason: authStore.loginFailureReason }
    })
    return
  }

  if (to.name !== 'Login' && to.name !== 'LoginFailed') {
    authStore.clearLoginFailure()
  }

  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (requiresGuest && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
