import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PasswordInput from '../../../components/ui/PasswordInput.vue'

describe('PasswordInput', () => {
  it('renders password input', () => {
    const wrapper = mount(PasswordInput)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('has password type by default', () => {
    const wrapper = mount(PasswordInput)
    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('password')
  })

  it('toggles to text type when eye icon is clicked', async () => {
    const wrapper = mount(PasswordInput)

    const toggleButton = wrapper.find('.absolute.top-5')
    await toggleButton.trigger('click')

    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('text')
  })

  it('toggles back to password type when clicked again', async () => {
    const wrapper = mount(PasswordInput)

    const toggleButton = wrapper.find('.absolute.top-5')
    await toggleButton.trigger('click')
    await toggleButton.trigger('click')

    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('password')
  })

  it('binds modelValue correctly', async () => {
    const wrapper = mount(PasswordInput, {
      props: {
        modelValue: 'testpassword',
      },
    })

    const input = wrapper.find('input')
    expect((input.element as HTMLInputElement).value).toBe('testpassword')
  })

  it('updates modelValue when input changes', async () => {
    const wrapper = mount(PasswordInput)

    const input = wrapper.find('input')
    await input.setValue('newpassword')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['newpassword'])
  })
})
