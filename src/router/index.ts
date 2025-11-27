import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
// import { useOnboardingStore } from '@/stores/onboarding'

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
    path: '/theme',
    name: 'theme',
    component: () => import('@/views/ThemeChoice.vue'),
    meta: { guestOnly: true },
  },

  // Discover Application - Mentorats Presentation
]

const router = createRouter({ history: createWebHistory(), routes })

// TODO: réactiver la redirection par rôle quand le backend gérera is_leener / is_mentor
// router.beforeEach((to) => {
//   if (to.name === 'onboarding-start') {
//     const store = useOnboardingStore()
//     if (store.role === 'leener') return { name: 'onboarding-leener' }
//     if (store.role === 'mentor') return { name: 'onboarding-mentor' }
//     return { name: 'onboarding-role' }
//   }
//   return true
// })

export default router
