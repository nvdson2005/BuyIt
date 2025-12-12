import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoadingScreen from '../../../components/layout/LoadingScreen.vue'

describe('LoadingScreen', () => {
  it('renders loading screen', () => {
    const wrapper = mount(LoadingScreen)
    expect(wrapper.find('.loader').exists()).toBe(true)
  })

  it('has full screen container', () => {
    const wrapper = mount(LoadingScreen)
    expect(wrapper.find('.w-full.h-screen').exists()).toBe(true)
  })

  it('displays loader animation', () => {
    const wrapper = mount(LoadingScreen)
    const loader = wrapper.find('.loader')
    expect(loader.exists()).toBe(true)
    expect(loader.classes()).toContain('loader')
  })
})
