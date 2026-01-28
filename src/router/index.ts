import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
  { path: '/about', name: 'about', component: () => import('@/views/AboutView.vue') },

  // Discover Application - Slider
  {
    path: '/discover',
    name: 'discover',
    component: () => import('@/views/onboarding/DiscoverView.vue'),
    meta: { guestOnly: true },
  },

  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/AuthView.vue'),
    meta: { guestOnly: true },
  },

  {
    path: '/:profile(leener|mentor)/register',
    name: 'register',
    component: () => import('@/views/onboarding/RegisterView.vue'),
    props: true,
    alias: ['/:profile(leener|mentor)/register/'],
    meta: { guestOnly: true },
  },
  {
    path: '/leener/onboarding',
    name: 'leener-onboarding',
    component: () => import('@/views/onboarding/leener/LeenerOnboardingView.vue'),
    alias: ['/leener/onboarding/'],
    meta: { requiresAuth: true },
  },
  {
    path: '/mentor/onboarding',
    name: 'mentor-onboarding',
    component: () => import('@/views/onboarding/mentor/MentorOnboardingView.vue'),
    alias: ['/mentor/onboarding/'],
    meta: { requiresAuth: true },
  },
  {
    path: '/leener/onboarding/objectives',
    name: 'leener-onboarding-objectives',
    component: () => import('@/views/onboarding/leener/LeenerObjectivesView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/leener/onboarding/themes',
    name: 'leener-onboarding-themes',
    component: () => import('@/views/onboarding/leener/LeenerThemeChoiceView.vue'),
    meta: { requiresAuth: true },
  },

  {
    path: '/auth/dashboard-mentor',
    name: 'dashboard-mentor',
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
    const target = store.user?.is_mentor ? 'dashboard-mentor' : 'dashboard-leener'
    return { name: target }
  }

  return true
})

export default router
