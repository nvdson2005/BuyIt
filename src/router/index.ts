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
import SellerVoucherView from '@/views/SellerVoucherView.vue'
import MarketingView from '@/views/MarketingView.vue'
import ShopProgram from '@/views/ShopProgram.vue'
import SearchResultView from '@/views/SearchResultView.vue'
import CustomerServiceView from '@/views/CustomerServiceView.vue'
import AboutView from '@/views/AboutView.vue'
import PaymentView from '@/views/PaymentView.vue'
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
      path: '/marketing',
      name: 'marketing',
      component: MarketingView,
    },
    {
      path: '/program',
      name: 'program',
      component: ShopProgram,
    },
    {
      path: '/voucher',
      name: 'voucher',
      component: SellerVoucherView,
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
    {
      path: '/search',
      name: 'search',
      component: SearchResultView,
    },
    {
      path: '/customer-service',
      name: 'customer-service',
      component: CustomerServiceView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/payment',
      name: 'payment',
      component: PaymentView,
    },
  ],
})

export default router
