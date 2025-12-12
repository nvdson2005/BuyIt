import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../../views/LoginView.vue'
import router from '../../router/index'
import apiClient from '../../api/client'
import { AxiosError, AxiosResponse } from 'axios'

vi.mock('../../api/client', () => ({
  default: {
    post: vi.fn(),
  },
}))

vi.mock('../../utils/notify', () => ({
  notify: vi.fn(),
  notifyAsync: vi.fn((promise) => promise),
}))

describe('LoginView', () => {
  let testRouter: ReturnType<typeof createRouter>

  beforeEach(() => {
    testRouter = createRouter({
      history: createWebHistory(),
      routes: router.getRoutes(),
    })
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('renders login view', () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [testRouter],
      },
    })

    expect(wrapper.findComponent({ name: 'AuthContainer' }).exists()).toBe(true)
  })

  it('redirects to home if user is already logged in', async () => {
    localStorage.setItem('username', 'testuser')
    const pushSpy = vi.spyOn(testRouter, 'push')

    mount(LoginView, {
      global: {
        plugins: [testRouter],
      },
    })

    await new Promise((resolve) => setTimeout(resolve, 100))
    expect(pushSpy).toHaveBeenCalledWith({ name: 'home' })
  })

  it('handles successful login', async () => {
    const mockResponse = {
      data: {
        user: {
          id: '1',
          role: 'buyer',
        },
      },
    }

    vi.mocked(apiClient.post).mockResolvedValue(mockResponse)
    const pushSpy = vi.spyOn(testRouter, 'push')

    const wrapper = mount(LoginView, {
      global: {
        plugins: [testRouter],
      },
    })

    const authContainer = wrapper.findComponent({ name: 'AuthContainer' })
    await authContainer.vm.$emit('login', 'testuser', 'testpass')

    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(localStorage.getItem('username')).toBe('testuser')
    expect(localStorage.getItem('role')).toBe('buyer')
    expect(localStorage.getItem('id')).toBe('1')
    expect(pushSpy).toHaveBeenCalledWith({ name: 'home' })
  })

  it('handles login error with response', async () => {
    const mockError = new AxiosError('Request failed')
    mockError.response = {
      data: {
        message: 'Invalid credentials',
      },
    } as unknown as AxiosResponse

    vi.mocked(apiClient.post).mockRejectedValue(mockError)

    const wrapper = mount(LoginView, {
      global: {
        plugins: [testRouter],
      },
    })

    const authContainer = wrapper.findComponent({ name: 'AuthContainer' })
    await authContainer.vm.$emit('login', 'testuser', 'wrongpass')

    await new Promise((resolve) => setTimeout(resolve, 300))
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Invalid credentials')
  })

  it('handles login error without response', async () => {
    const mockError = new AxiosError('Request failed')
    mockError.request = {}

    vi.mocked(apiClient.post).mockRejectedValue(mockError)

    const wrapper = mount(LoginView, {
      global: {
        plugins: [testRouter],
      },
    })

    const authContainer = wrapper.findComponent({ name: 'AuthContainer' })
    await authContainer.vm.$emit('login', 'testuser', 'testpass')

    await new Promise((resolve) => setTimeout(resolve, 300))
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('No response from server')
  })
})
