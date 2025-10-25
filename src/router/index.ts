import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

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
  // Discover Application - Mentorats Presentation
  {
    path: '/presentation-mentorats',
    name: 'presentation-mentorats',
    component: () => import('@/views/PresentationMentoratsView.vue'),
    meta: { guestOnly: true },
  },
]

const router = createRouter({ history: createWebHistory(), routes })

export default router