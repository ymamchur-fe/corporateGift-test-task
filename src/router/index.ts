import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: () => import('../pages/Home.vue') },
        { path: '/edit/:id', name: 'Edit',  component: () => import('../pages/Edit.vue') }
    ],
})
