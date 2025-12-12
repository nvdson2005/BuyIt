import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Checkbox from '../../../components/ui/Checkbox.vue'

describe('Checkbox', () => {
  it('renders checkbox component', () => {
    const wrapper = mount(Checkbox)
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
  })

  it('is checked when modelValue is true', () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: true,
      },
    })

    const checkbox = wrapper.find('input[type="checkbox"]')
    expect((checkbox.element as HTMLInputElement).checked).toBe(true)
  })

  it('is unchecked when modelValue is false', () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: false,
      },
    })

    const checkbox = wrapper.find('input[type="checkbox"]')
    expect((checkbox.element as HTMLInputElement).checked).toBe(false)
  })

  it('emits update:modelValue when clicked', async () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: false,
      },
    })

    const checkbox = wrapper.find('input[type="checkbox"]')
    await checkbox.setValue(true)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('does not emit when disabled and clicked', async () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: false,
        disabled: true,
      },
    })

    const checkbox = wrapper.find('input[type="checkbox"]')
    await checkbox.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('renders slot content', () => {
    const wrapper = mount(Checkbox, {
      slots: {
        default: 'Checkbox Label',
      },
    })

    expect(wrapper.text()).toContain('Checkbox Label')
  })

  it('has disabled attribute when disabled prop is true', () => {
    const wrapper = mount(Checkbox, {
      props: {
        disabled: true,
      },
    })

    const checkbox = wrapper.find('input[type="checkbox"]')
    expect(checkbox.attributes('disabled')).toBeDefined()
  })
})
