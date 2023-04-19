// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/DefaultPage.vue'),
    children: [
      {
        path: ' ',
        name: 'Tasks',
        component: () => import('@/views/TasksPage.vue'),
      },
      {
        path: 'projects',
        name: 'Projects',
        component: () => import('@/views/ProjectsPage.vue'),
      },
      {
        path: 'collaborators',
        name: 'Collaborators',
        component: () => import('@/views/CollaboratorsPage.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
