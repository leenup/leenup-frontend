import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
  { path: '/about', name: 'about', component: () => import('@/views/AboutView.vue') },
]

export default createRouter({ history: createWebHistory(), routes })