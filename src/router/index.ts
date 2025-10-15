import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
  { path: '/about', name: 'about', component: () => import('@/views/AboutView.vue') },

  // 👇 nouvelle route “Je découvre l’application”
  {
    path: '/discover',
    name: 'onboarding',
    component: () => import('@/views/OnboardingView.vue'),
    meta: { guestOnly: true }, // optionnel : accessible même non connecté
  },
]

const router = createRouter({ history: createWebHistory(), routes })

export default router