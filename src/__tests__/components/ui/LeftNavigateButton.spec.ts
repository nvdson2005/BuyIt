import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LeftNavigateButton from '../../../components/ui/LeftNavigateButton.vue'

describe('LeftNavigateButton', () => {
  it('renders left navigate button', () => {
    const wrapper = mount(LeftNavigateButton)
    expect(wrapper.find('.slide-notification').exists()).toBe(true)
  })

  it('displays correct text', () => {
    const wrapper = mount(LeftNavigateButton)
    expect(wrapper.text()).toContain('SlideNotification')
  })
})
