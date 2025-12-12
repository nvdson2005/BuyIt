import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BrandItem from '../../../components/ui/BrandItem.vue'

describe('BrandItem', () => {
  it('renders brand item with name and image', () => {
    const wrapper = mount(BrandItem, {
      props: {
        brandName: 'Test Brand',
        imgUrl: 'https://example.com/brand.jpg',
      },
    })

    expect(wrapper.text()).toContain('Test Brand')
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('https://example.com/brand.jpg')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(BrandItem, {
      props: {
        brandName: 'Test Brand',
      },
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.[0]).toEqual(['Test Brand'])
  })

  it('uses default image when imgUrl is not provided', () => {
    const wrapper = mount(BrandItem, {
      props: {
        brandName: 'Test Brand',
      },
    })

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
  })
})
