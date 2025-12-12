import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ShopButton from '../../../components/ui/ShopButton.vue'

describe('ShopButton', () => {
  it('renders shop button with shopping cart icon', () => {
    const wrapper = mount(ShopButton)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('has correct container classes', () => {
    const wrapper = mount(ShopButton)
    expect(wrapper.find('.w-full.h-full').exists()).toBe(true)
  })
})
