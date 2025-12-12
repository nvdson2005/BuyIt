import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SignupForm from '../../../components/layout/SignupForm.vue'

describe('SignupForm', () => {
  it('renders signup form with all fields', () => {
    const wrapper = mount(SignupForm)

    expect(wrapper.find('input[placeholder="First Name"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Last Name"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Email"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Phone number"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Username"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Password"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Retype Password"]').exists()).toBe(true)
  })

  it('shows validation errors for empty fields', async () => {
    const wrapper = mount(SignupForm)

    await wrapper.find('form').trigger('submit')
    await wrapper.vm.$nextTick()

    const text = wrapper.text()
    expect(text).toContain('First name is required')
    expect(text).toContain('Last name is required')
    expect(text).toContain('Email is required')
    expect(text).toContain('Username is required')
    expect(text).toContain('Password is required')
    // Note: retype password error may not show if password is also empty
    expect(text).toContain('Phone number is required')
  })

  it('shows error when passwords do not match', async () => {
    const wrapper = mount(SignupForm)

    const firstNameInput = wrapper.find('input[placeholder="First Name"]')
    const lastNameInput = wrapper.find('input[placeholder="Last Name"]')
    const emailInput = wrapper.find('input[placeholder="Email"]')
    const phoneInput = wrapper.find('input[placeholder="Phone number"]')
    const usernameInput = wrapper.find('input[placeholder="Username"]')
    const passwordInput = wrapper.find('input[placeholder="Password"]')
    const retypePasswordInput = wrapper.find('input[placeholder="Retype Password"]')

    await firstNameInput.setValue('John')
    await lastNameInput.setValue('Doe')
    await emailInput.setValue('john@example.com')
    await phoneInput.setValue('1234567890')
    await usernameInput.setValue('johndoe')
    await passwordInput.setValue('password123')
    await retypePasswordInput.setValue('password456')

    await wrapper.find('form').trigger('submit')

    expect(wrapper.text()).toContain('Passwords do not match')
  })

  it('emits signup event with all form data when valid', async () => {
    const wrapper = mount(SignupForm)

    const firstNameInput = wrapper.find('input[placeholder="First Name"]')
    const lastNameInput = wrapper.find('input[placeholder="Last Name"]')
    const emailInput = wrapper.find('input[placeholder="Email"]')
    const phoneInput = wrapper.find('input[placeholder="Phone number"]')
    const usernameInput = wrapper.find('input[placeholder="Username"]')
    const passwordInput = wrapper.find('input[placeholder="Password"]')
    const retypePasswordInput = wrapper.find('input[placeholder="Retype Password"]')

    await firstNameInput.setValue('John')
    await lastNameInput.setValue('Doe')
    await emailInput.setValue('john@example.com')
    await phoneInput.setValue('1234567890')
    await usernameInput.setValue('johndoe')
    await passwordInput.setValue('password123')
    await retypePasswordInput.setValue('password123')

    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('signup')).toBeTruthy()
    expect(wrapper.emitted('signup')?.[0]).toEqual([
      'John',
      'Doe',
      'john@example.com',
      'johndoe',
      'password123',
      'password123',
      '1234567890',
      'buyer',
    ])
  })

  it('allows selecting buyer or seller role', async () => {
    const wrapper = mount(SignupForm)

    const buyerButton = wrapper.findAll('button').find((btn) => btn.text() === 'Buyer')
    const sellerButton = wrapper.findAll('button').find((btn) => btn.text() === 'Seller')

    expect(buyerButton).toBeTruthy()
    expect(sellerButton).toBeTruthy()

    if (sellerButton) {
      await sellerButton.trigger('click')
      // Test through UI - check if button has active class
      expect(sellerButton.classes()).toContain('bg-orange-600')
      // Or test that the form emits with seller role when submitted
    }

    if (buyerButton) {
      await buyerButton.trigger('click')
      expect(buyerButton.classes()).toContain('bg-orange-600')
    }
  })

  it('toggles password visibility', async () => {
    const wrapper = mount(SignupForm)

    const passwordInput = wrapper.find('input[placeholder="Password"]')
    expect(passwordInput.attributes('type')).toBe('password')

    const toggleButton = wrapper.find('.absolute.top-1\\/2')
    await toggleButton.trigger('click')

    const updatedPasswordInput = wrapper.find('input[placeholder="Password"]')
    expect(updatedPasswordInput.attributes('type')).toBe('text')
  })
})
