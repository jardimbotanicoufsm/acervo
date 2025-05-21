import { createRouter, createWebHistory } from 'vue-router'
import ItemView from '../views/ItemView.vue'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFound.vue'
import AcervoView from '../views/AcervoView.vue'

const routes = [
  {
    path: '/item/:id',
    name: 'Item',
    component: ItemView
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/itens',
    name: 'Acervo',
    component: AcervoView
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory('/acervo/'),  // Add the base path for GitHub Pages
  routes,
  scrollBehavior(to, from, savedPosition) {
  if (to.hash) {
    return {
      el: to.hash,
      behavior: 'smooth',
    }
  }
  return { top: 0 }
},
})

export default router
