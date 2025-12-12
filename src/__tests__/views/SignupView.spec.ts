import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import SignupView from '../../views/SignupView.vue'
import router from '../../router/index'
import apiClient from '../../api/client'

vi.mock('../../api/client', () => ({
  default: {
    post: vi.fn(),
  },
}))

vi.mock('../../utils/notify', () => ({
  notify: vi.fn(),
  notifyAsync: vi.fn((promise) => promise),
}))

describe('SignupView', () => {
  let testRouter: ReturnType<typeof createRouter>

  beforeEach(() => {
    testRouter = createRouter({
      history: createWebHistory(),
      routes: router.getRoutes(),
    })
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders signup view', () => {
    const wrapper = mount(SignupView, {
      global: {
        plugins: [testRouter],
      },
    })

    expect(wrapper.findComponent({ name: 'AuthContainer' }).exists()).toBe(true)
  })

  it('handles successful signup', async () => {
    vi.mocked(apiClient.post).mockResolvedValue({ data: {} })
    const pushSpy = vi.spyOn(testRouter, 'push')

    const wrapper = mount(SignupView, {
      global: {
        plugins: [testRouter],
      },
    })

    const authContainer = wrapper.findComponent({ name: 'AuthContainer' })
    await authContainer.vm.$emit(
      'signup',
      'John',
      'Doe',
      'john@example.com',
      'johndoe',
      'pass123',
      'pass123',
      '1234567890',
      'buyer',
    )

    await wrapper.vm.$nextTick()
    // Advance fake timers to trigger setTimeout in component
    vi.advanceTimersByTime(1100)

    expect(apiClient.post).toHaveBeenCalledWith('/signup', {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      username: 'johndoe',
      password: 'pass123',
      phoneNumber: '1234567890',
      role: 'buyer',
    })
    expect(pushSpy).toHaveBeenCalledWith({ name: 'login' })
  })

  it('handles signup error', async () => {
    const mockError = {
      response: {
        data: {
          message: 'Username already exists',
        },
      },
    }

    vi.mocked(apiClient.post).mockRejectedValue(mockError)

    const wrapper = mount(SignupView, {
      global: {
        plugins: [testRouter],
      },
    })

    const authContainer = wrapper.findComponent({ name: 'AuthContainer' })
    await authContainer.vm.$emit(
      'signup',
      'John',
      'Doe',
      'john@example.com',
      'johndoe',
      'pass123',
      'pass123',
      '1234567890',
      'buyer',
    )

    await wrapper.vm.$nextTick()
    // Advance fake timers for any async operations
    vi.advanceTimersByTime(100)
    await wrapper.vm.$nextTick()
    expect(apiClient.post).toHaveBeenCalled()
  })

  it('validates password match before submitting', async () => {
    const wrapper = mount(SignupView, {
      global: {
        plugins: [testRouter],
      },
    })

    await wrapper
      .findComponent({ name: 'AuthContainer' })
      .vm.$emit(
        'signup',
        'John',
        'Doe',
        'john@example.com',
        'johndoe',
        'pass123',
        'pass456',
        '1234567890',
        'buyer',
      )

    expect(apiClient.post).not.toHaveBeenCalled()
  })
})
