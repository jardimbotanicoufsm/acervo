// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import PlantDetail from '../views/PlantDetail.vue';

const routes = [
  { path: '/acervo/item/:id', name: 'PlantDetail', component: PlantDetail },
  { path:'/acervo', name: 'Acervo', component: () => import('../views/PlantCollection.vue') },
];

export default createRouter({
  history: createWebHistory('/jb-pages/'),
  routes,
});
