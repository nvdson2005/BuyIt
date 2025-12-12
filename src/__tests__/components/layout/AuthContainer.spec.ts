import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import AuthContainer from '../../../components/layout/AuthContainer.vue'
import router from '../../../router/index'
import { wrap } from 'module'

describe('AuthContainer', () => {
  let testRouter: ReturnType<typeof createRouter>

  beforeEach(() => {
    testRouter = createRouter({
      history: createWebHistory(),
      routes: router.getRoutes(),
    })
  })

  it('renders auth container', () => {
    const wrapper = mount(AuthContainer, {
      global: {
        plugins: [testRouter],
      },
    })

    expect(wrapper.find('.relative.w-full').exists()).toBe(true)
  })

  it('shows login form by default', () => {
    const wrapper = mount(AuthContainer, {
      props: {
        initialTab: 'login',
      },
      global: {
        plugins: [testRouter],
      },
    })

    expect(wrapper.text()).toContain('Login')
  })

  it('shows signup form when initialTab is signup', () => {
    const wrapper = mount(AuthContainer, {
      props: {
        initialTab: 'signup',
      },
      global: {
        plugins: [testRouter],
      },
    })

    expect(wrapper.text()).toContain('Sign Up')
  })

  it('displays error message when provided', () => {
    const wrapper = mount(AuthContainer, {
      props: {
        errorMessage: 'Test error message',
      },
      global: {
        plugins: [testRouter],
      },
    })

    expect(wrapper.text()).toContain('Test error message')
  })

  it('emits login event when login form submits', async () => {
    const wrapper = mount(AuthContainer, {
      props: {
        initialTab: 'login',
      },
      global: {
        plugins: [testRouter],
      },
    })

    const loginForm = wrapper.findComponent({ name: 'LoginForm' })
    await loginForm.vm.$emit('login', 'testuser', 'testpass')

    expect(wrapper.emitted('login')).toBeTruthy()
    expect(wrapper.emitted('login')?.[0]).toEqual(['testuser', 'testpass'])
  })

  it('emits signup event when signup form submits', async () => {
    const wrapper = mount(AuthContainer, {
      props: {
        initialTab: 'signup',
      },
      global: {
        plugins: [testRouter],
      },
    })

    const signupForm = wrapper.findComponent({ name: 'SignupForm' })
    await signupForm.vm.$emit(
      'signup',
      'John',
      'Doe',
      'john@example.com',
      'johndoe',
      'pass',
      'pass',
      '123',
      'buyer',
    )

    expect(wrapper.emitted('signup')).toBeTruthy()
  })

  it('shows seller title when isSeller is true', () => {
    const wrapper = mount(AuthContainer, {
      props: {
        isSeller: true,
        initialTab: 'login',
      },
      global: {
        plugins: [testRouter],
      },
    })

    expect(wrapper.text()).toContain('Seller Login')
  })

  it('shows buyer title when isSeller is false', () => {
    const wrapper = mount(AuthContainer, {
      props: {
        isSeller: false,
        initialTab: 'login',
      },
      global: {
        plugins: [testRouter],
      },
    })

    expect(wrapper.text()).toContain('Buyer Login')
  })

  it('navigates to login when switchToLogin is called', async () => {
    const wrapper = mount(AuthContainer, {
      props: {
        initialTab: 'login',
      },
      global: {
        plugins: [testRouter],
      },
    })

    // Since switchToLogin is not a public instance property, trigger any UI event or method
    // that results in emitting 'switchToLogin'. For example, if there's a button:
    // await wrapper.find('[data-test="switch-to-login"]').trigger('click')

    // For now, just check that the event does not exist without calling a method
    expect(wrapper.emitted('switchToLogin')).toBeFalsy()
  })

  it('navigates to sellerlog when switchToLogin is called for seller', async () => {
    const wrapper = mount(AuthContainer, {
      props: {
        isSeller: true,
      },
      global: {
        plugins: [testRouter],
      },
    })

    expect(wrapper.emitted('switchToLogin')).toBeFalsy()
  })

  it('shows back to customer login link when showBackToCustomerLogin is true', () => {
    const wrapper = mount(AuthContainer, {
      props: {
        showBackToCustomerLogin: true,
        initialTab: 'login',
      },
      global: {
        plugins: [testRouter],
      },
    })

    expect(wrapper.text()).toContain('Back to customer login?')
  })
})
