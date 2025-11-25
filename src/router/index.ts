import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useOnboardingStore } from '@/stores/onboarding'

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
    path: '/onboarding/learner',
    name: 'onboarding-learner',
    component: () => import('@/views/OnboardingLearner.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/onboarding/mentor',
    name: 'onboarding-mentor',
    component: () => import('@/views/OnboardingMentor.vue'),
    meta: { guestOnly: true },
  },

  // Discover Application - Mentorats Presentation
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to) => {
  if (to.name === 'onboarding-start') {
    const store = useOnboardingStore()
    if (store.role === 'learner') return { name: 'onboarding-learner' }
    if (store.role === 'mentor') return { name: 'onboarding-mentor' }
    return { name: 'onboarding-role' }
  }
  return true
})

export default router
