// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/DefaultPage.vue'),
    children: [
      {
        path: 'task',
        name: 'Tasks',
        component: () => import('@/views/TasksPage.vue'),
      },
      {
        path: 'projects',
        name: 'Projects',
        component: () => import('@/views/ProjectsPage.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
