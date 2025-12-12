import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginForm from '../../../components/layout/LoginForm.vue'

describe('LoginForm', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders login form', () => {
    const wrapper = mount(LoginForm)
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
  })

  it('emits login event with username and password on submit', async () => {
    const wrapper = mount(LoginForm)

    const usernameInput = wrapper.find('input[type="text"]')
    const passwordInput = wrapper.find('input[type="password"]')

    await usernameInput.setValue('testuser')
    await passwordInput.setValue('testpass')

    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('login')).toBeTruthy()
    expect(wrapper.emitted('login')?.[0]).toEqual(['testuser', 'testpass'])
  })

  it('shows error when username is empty', async () => {
    const wrapper = mount(LoginForm)

    const passwordInput = wrapper.find('input[type="password"]')
    await passwordInput.setValue('testpass')

    await wrapper.find('form').trigger('submit')

    expect(wrapper.text()).toContain('Please enter your username')
  })

  it('shows error when password is empty', async () => {
    const wrapper = mount(LoginForm)

    const usernameInput = wrapper.find('input[type="text"]')
    await usernameInput.setValue('testuser')

    await wrapper.find('form').trigger('submit')

    expect(wrapper.text()).toContain('Please enter your password')
  })

  it('toggles password visibility', async () => {
    const wrapper = mount(LoginForm)

    const passwordInput = wrapper.find('input[type="password"]')
    expect(passwordInput.attributes('type')).toBe('password')

    const toggleButton = wrapper.find('.absolute.top-5')
    await toggleButton.trigger('click')

    const updatedPasswordInput = wrapper.find('input[placeholder="Password"]')
    expect(updatedPasswordInput.attributes('type')).toBe('text')
  })

  it('disables button after submit', async () => {
    const wrapper = mount(LoginForm)

    const usernameInput = wrapper.find('input[type="text"]')
    const passwordInput = wrapper.find('input[type="password"]')

    await usernameInput.setValue('testuser')
    await passwordInput.setValue('testpass')

    await wrapper.find('form').trigger('submit')

    const button = wrapper.find('button[type="submit"]')
    expect(button.attributes('disabled')).toBeDefined()
  })

  it('enables button after timeout', async () => {
    const wrapper = mount(LoginForm)

    const usernameInput = wrapper.find('input[type="text"]')
    const passwordInput = wrapper.find('input[type="password"]')

    await usernameInput.setValue('testuser')
    await passwordInput.setValue('testpass')

    await wrapper.find('form').trigger('submit')

    const button = wrapper.find('button[type="submit"]')
    expect(button.attributes('disabled')).toBeDefined()

    vi.advanceTimersByTime(5000)

    await wrapper.vm.$nextTick()
    expect(button.attributes('disabled')).toBeUndefined()
  })
})
