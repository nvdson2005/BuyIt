import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CustomImage from '../../../components/ui/CustomImage.vue'

describe('CustomImage', () => {
  it('renders image with source and alt', () => {
    const wrapper = mount(CustomImage, {
      props: {
        source: 'https://example.com/image.jpg',
        alt: 'Test Image',
        className: 'test-class',
      },
    })

    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('https://example.com/image.jpg')
    expect(img.attributes('alt')).toBe('Test Image')
    expect(img.attributes('class')).toContain('test-class')
  })

  it('shows error placeholder when image fails to load', async () => {
    const wrapper = mount(CustomImage, {
      props: {
        source: 'https://invalid-url.com/image.jpg',
        alt: 'Test Image',
        className: 'test-class',
      },
    })

    const img = wrapper.find('img')
    await img.trigger('error')

    expect(wrapper.emitted()).toBeDefined() // Dummy check to use wrapper
    expect(wrapper.html()).toContain('Error loading image')
  })

  it('applies className to error placeholder', async () => {
    const wrapper = mount(CustomImage, {
      props: {
        source: 'https://invalid-url.com/image.jpg',
        alt: 'Test Image',
        className: 'custom-class',
      },
    })

    const img = wrapper.find('img')
    await img.trigger('error')

    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain('custom-class')
  })
})
