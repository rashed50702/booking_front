// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
    meta: { guest: true }
  },
  {
    path: '/registration',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'RegistrationForm',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Registration.vue'),
      },
    ],
    meta: { guest: true }
  },
  {
    path: '/dashboard',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Dashboard.vue'),
      },
    ],
    meta: { auth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

function isLoggedIn() {
  return localStorage.getItem("auth");
}
router.beforeEach((to, from) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.auth && !isLoggedIn()) {
    // this route requires auth, check if logged in
    return {
      path: '/',
      // save the location we were at to come back later
      // query: { redirect: to.fullPath },
    }
  } else if (to.meta.guest && isLoggedIn()) {
    return {
      path: '/dashboard',
      // save the location we were at to come back later
      // query: { redirect: to.fullPath },
    }
  }
});

export default router
