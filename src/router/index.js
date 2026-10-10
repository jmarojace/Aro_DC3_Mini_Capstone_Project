import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuth } from '../stores/auth'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import InventoryView from '../views/InventoryView.vue'
import POSView from '../views/POSView.vue'
import SalesView from '../views/SalesView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { public: true } },
    { path: '/login', name: 'login', component: LoginView, meta: { public: true } },
    { path: '/dashboard', name: 'dashboard', component: DashboardView },
    { path: '/inventory', name: 'inventory', component: InventoryView },
    { path: '/pos', name: 'pos', component: POSView },
    { path: '/sales', name: 'sales', component: SalesView },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

// Navigation guard: block private pages until the user signs in
router.beforeEach(to => {
  const auth = useAuth()
  if (!to.meta.public && !auth.isLoggedIn) return { name: 'login' }
  if (to.name === 'login' && auth.isLoggedIn) return { name: 'dashboard' }
})

export default router