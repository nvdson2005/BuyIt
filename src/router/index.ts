import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import CategoryView from '@/views/CategoryView.vue'
import CartView from '@/views/CartView.vue'
import ProfileView from '@/views/ProfileView.vue'
import OrderView from '@/views/OrderView.vue'
import ProductView from '@/views/ProductView.vue'
import SellerView from '@/views/SellerView.vue'
import AddProductView from '@/views/AddProductView.vue'
import SellerProductsView from '@/views/SellerProductsView.vue'
import SellerOrdersView from '@/views/SellerOrdersView.vue'
import SellerLoginView from '@/views/SellerLoginView.vue'
import CheckoutView from '@/views/CheckoutView.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
    {
      path: '/category/:id',
      name: 'category',
      component: CategoryView,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrderView,
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: SellerView,
    },
    {
      path: '/add_product',
      name: 'add_product',
      component: AddProductView,
    },
    {
      path: '/all_products',
      name: 'all_products',
      component: SellerProductsView,
    },
    {
      path: '/all_orders',
      name: 'all_orders',
      component: SellerOrdersView,
    },
    {
      path: '/sellerlog',
      name: 'sellerlog',
      component: SellerLoginView,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
    },
  ],
})

export default router
