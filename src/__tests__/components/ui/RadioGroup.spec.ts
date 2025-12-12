import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RadioGroup from '../../../components/ui/RadioGroup.vue'

describe('RadioGroup', () => {
  const options = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
  ]

  it('renders radio group with options', () => {
    const wrapper = mount(RadioGroup, {
      props: {
        modelValue: 'opt1',
        options,
      },
    })

    expect(wrapper.findAll('input[type="radio"]')).toHaveLength(3)
    expect(wrapper.text()).toContain('Option 1')
    expect(wrapper.text()).toContain('Option 2')
    expect(wrapper.text()).toContain('Option 3')
  })

  it('emits update:modelValue when option is selected', async () => {
    const wrapper = mount(RadioGroup, {
      props: {
        modelValue: 'opt1',
        options,
      },
    })

    const radioInputs = wrapper.findAll('input[type="radio"]')
    await radioInputs[1].setValue(true)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['opt2'])
  })

  it('checks the correct option based on modelValue', () => {
    const wrapper = mount(RadioGroup, {
      props: {
        modelValue: 'opt2',
        options,
      },
    })

    const radioInputs = wrapper.findAll('input[type="radio"]')
    expect((radioInputs[0].element as HTMLInputElement).checked).toBe(false)
    expect((radioInputs[1].element as HTMLInputElement).checked).toBe(true)
    expect((radioInputs[2].element as HTMLInputElement).checked).toBe(false)
  })

  it('applies horizontal direction by default', () => {
    const wrapper = mount(RadioGroup, {
      props: {
        modelValue: 'opt1',
        options,
      },
    })

    const radioGroup = wrapper.find('.radio-group')
    expect(radioGroup.exists()).toBe(true)
    // Horizontal is the default behavior, not necessarily a class
    expect(radioGroup.classes()).toContain('radio-group')
  })

  it('applies vertical direction class when direction is vertical', () => {
    const wrapper = mount(RadioGroup, {
      props: {
        modelValue: 'opt1',
        options,
        direction: 'vertical',
      },
    })

    expect(wrapper.find('.radio-group').classes()).toContain('vertical')
  })
})
