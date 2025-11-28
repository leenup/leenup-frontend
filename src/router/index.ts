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

router.beforeEach(async (to) => {
  const store = useAuthStore()
  const needsSessionCheck = to.meta.requiresAuth || to.meta.guestOnly || to.path.startsWith('/auth/')

  if (needsSessionCheck) {
    await store.ensureSession()
  }

  if ((to.meta.requiresAuth || to.path.startsWith('/auth/')) && !store.isAuthenticated) {
    return { name: 'auth' }
  }

  if (to.meta.guestOnly && store.isAuthenticated) {
    return { name: 'dashboard-leener' }
  }

  return true
})

export default router
