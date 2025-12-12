import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../../views/HomeView.vue'
import router from '../../router/index'
import apiClient from '../../api/client'

// Mock cookieStore
global.cookieStore = {
  get: vi.fn().mockResolvedValue(null),
} as unknown as CookieStore

vi.mock('../../api/client', () => ({
  default: {
    get: vi.fn(),
  },
}))

describe('HomeView', () => {
  let testRouter: ReturnType<typeof createRouter>

  beforeEach(() => {
    testRouter = createRouter({
      history: createWebHistory(),
      routes: router.getRoutes(),
    })
    localStorage.clear()
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders loading screen initially', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [testRouter],
      },
    })

    expect(wrapper.findComponent({ name: 'LoadingScreen' }).exists()).toBe(true)
  })

  it('shows home content after loading when username exists', async () => {
    localStorage.setItem('username', 'testuser')
    localStorage.setItem('role', 'buyer')

    // Mock notifications API call
    vi.mocked(apiClient.get).mockResolvedValue({ data: { notifications: [] } })

    const wrapper = mount(HomeView, {
      global: {
        plugins: [testRouter],
      },
    })

    // Advance fake timers to trigger setTimeout in component
    vi.advanceTimersByTime(1000)
    await wrapper.vm.$nextTick()
    // Advance a bit more for any async operations
    vi.advanceTimersByTime(100)
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent({ name: 'NavBar' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'MainPageCategoryPanel' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'MainPageFlashSalePanel' }).exists()).toBe(true)
  })

  it('does not call API when username is not in localStorage (redirects instead)', async () => {
    localStorage.removeItem('username')

    // Mock notifications API call (NavBar might call this)
    vi.mocked(apiClient.get).mockResolvedValue({ data: { notifications: [] } })

    const wrapper = mount(HomeView, {
      global: {
        plugins: [testRouter],
      },
    })

    await wrapper.vm.$nextTick()
    vi.advanceTimersByTime(100)
    await wrapper.vm.$nextTick()

    // Component redirects to login, so it shouldn't call /user/profile
    // (NavBar might call /user/notifications, but that's a different component)
    expect(apiClient.get).not.toHaveBeenCalledWith('/user/profile')
  })
})
