/**
 * @file This file contains the test utilities for the project.
 * @description This file contains the test utilities for the project.
 * @author BuyIt
 * @version 1.0.0
 * @since 1.0.0
 * @copyright BuyIt
 * @description This file contains the test utilities for the project.
 * @author BuyIt
 * @vitest-environment jsdom
 */
import { createRouter, createWebHistory } from 'vue-router'
import { vi } from 'vitest'
import router from '../../router/index'

// Mock router
export const mockRouter = createRouter({
  history: createWebHistory(),
  routes: router.getRoutes(),
})

// Mock notify functions
export const mockNotify = {
  notify: vi.fn(),
  notifyAsync: vi.fn((promise) => promise),
}

// Test data factories
/**
 * @description Creates a mock product.
 * @param overrides - The overrides for the product. Optional. Details added will override the default values.
 * @returns The mock product.
 */
export const createMockProduct = (overrides = {}) => ({
  id: '1',
  name: 'Test Product',
  description: 'Test Description',
  image_url: 'https://via.placeholder.com/150',
  price: 100,
  sale_price: 80,
  rating: 4.5,
  sold_amount: 100,
  stock_quantity: 50,
  shop_id: 'shop1',
  sub_category_id: 'cat1',
  ...overrides,
})

/**
 * @description Creates a mock cart item.
 * @param overrides - The overrides for the cart item. Optional. Details added will override the default values.
 * @returns The mock cart item.
 */
export const createMockCartItem = (overrides = {}) => ({
  id: '1',
  quantity: 1,
  prod_id: '1',
  prod_var_id: 'var1',
  variant_name: 'Default',
  price: 100,
  image_url: 'https://via.placeholder.com/150',
  product_name: 'Test Product',
  stock_quantity: 50,
  shop_id: 'shop1',
  ...overrides,
})

/**
 * @description Creates a mock shop.
 * @param overrides - The overrides for the shop. Optional. Details added will override the default values.
 * @returns The mock shop.
 */
export const createMockShop = (overrides = {}) => ({
  id: 'shop1',
  name: 'Test Shop',
  description: 'Test Shop Description',
  rating: 4.5,
  followers: 1000,
  image_url: 'https://via.placeholder.com/150',
  ...overrides,
})

/**
 * @description Creates a mock review.
 * @param overrides - The overrides for the review. Optional. Details added will override the default values.
 * @returns The mock review.
 */
export const createMockReview = (overrides = {}) => ({
  id: '1',
  product_id: '1',
  buyer_id: 'buyer1',
  rating: 5,
  comment: 'Great product!',
  created_at: new Date().toISOString(),
  image_url: 'https://via.placeholder.com/150',
  buyer_name: 'Test Buyer',
  ...overrides,
})

/**
 * @description Creates a mock voucher.
 * @param overrides - The overrides for the voucher. Optional. Details added will override the default values.
 * @returns The mock voucher.
 */
export const createMockVoucher = (overrides = {}) => ({
  voucher_id: '1',
  shop_id: 'shop1',
  code: 'TEST10',
  description: 'Test Voucher',
  discount_amount: 10,
  min_amount_to_apply: 50,
  max_discount_amount: 20,
  usage_limit: 100,
  discount_type: 'percentage' as const,
  applicable_scope: 'shop' as const,
  program_name: 'Test Program',
  start_date: new Date(),
  expiry_date: new Date(Date.now() + 86400000),
  is_active: true,
  ...overrides,
})
