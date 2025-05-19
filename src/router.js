import { createRouter, createWebHistory } from 'vue-router'
import ItemView from './views/ItemView.vue'

const routes = [
  {
    path: '/item/:id',
    name: 'Item',
    component: ItemView
  }
]

const router = createRouter({
  history: createWebHistory('/acervo/'),  // Add the base path for GitHub Pages
  routes
})

export default router
