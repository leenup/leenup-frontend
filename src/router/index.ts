import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
// import { useOnboardingStore } from '@/stores/onboarding'
import { useAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
  { path: '/about', name: 'about', component: () => import('@/views/AboutView.vue') },

  // Discover Application - Slider
  {
    path: '/discover',
    name: 'onboarding',
    component: () => import('@/views/OnboardingView.vue'),
    meta: { guestOnly: true },
  },

  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/AuthView.vue'),
    meta: { guestOnly: true },
  },

  {
    path: '/onboarding/role',
    name: 'onboarding-role',
    component: () => import('@/views/OnboardingRoleChoice.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/onboarding/start',
    name: 'onboarding-start',
    component: () => import('@/views/OnboardingView.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/onboarding/leener',
    name: 'onboarding-leener',
    component: () => import('@/views/OnboardingLeener.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/onboarding/mentor',
    name: 'onboarding-mentor',
    component: () => import('@/views/OnboardingMentor.vue'),
    meta: { guestOnly: true },
  },

  {
    path: '/auth/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/auth/dashboard-leener',
    name: 'dashboard-leener',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true },
  },

  {
    path: '/theme',
    name: 'theme',
    component: () => import('@/views/ThemeChoice.vue'),
    meta: { guestOnly: true },
  },
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to) => {
  if (to.meta.requiresAuth || to.path.startsWith('/auth/')) {
    const store = useAuthStore()
    if (!store.isAuthenticated) {
      return { name: 'auth' }
    }
  }
  return true
})

export default router
