import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import ErrorPage from '@/views/ErrorPage.vue'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
    meta: { title: 'Weather App - Home' },
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: () => import('@/views/AboutPage.vue'),
    meta: { title: 'Weather App - About' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'ErrorPage',
    component: ErrorPage,
    meta: { title: 'Weather App - 404' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  },
})

router.beforeEach((to) => {
  document.title = to.meta.title || 'Weather App'
})

export default router
