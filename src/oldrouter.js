import { createRouter, createWebHashHistory } from 'vue-router'
import ItemView from './views/ItemView.vue'
import NotFound from './views/NotFound.vue' 

const routes = [
  {
    path: '/item/:id',
    name: 'Item',
    component: ItemView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
