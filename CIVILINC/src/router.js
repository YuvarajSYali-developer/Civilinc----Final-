import Vue from 'vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'

import './style.css'

Vue.use(VueRouter)
Vue.use(Meta)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/page-03.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/projects-complaints',
      name: 'Projects & Complaints',
      component: () => import('@/views/ProjectsAndComplaints.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/map-forum',
      name: 'Map & Forum',
      component: () => import('@/views/MapForumPage.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/data-reports',
      name: 'Data & Reports',
      component: () => import('@/views/DataReportsPage.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/budget-allocation',
      name: 'Budget Allocation',
      component: () => import('@/views/BudgetAllocation.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/sign-in',
      name: 'Sign In',
      component: () => import('@/views/page-02.vue'),
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/home.vue')
    },
    {
      path: '*',
      name: 'Not Found',
      component: () => import('@/views/not-found.vue')
    }
  ]
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  
  // If route requires auth and user is not authenticated
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({
        path: '/sign-in',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  }
  // If route requires guest (like sign-in page) and user is authenticated
  else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (isAuthenticated && from.path !== '/') {
      next('/dashboard')
    } else {
      next()
    }
  }
  // For all other routes
  else {
    next()
  }
})

export default router
