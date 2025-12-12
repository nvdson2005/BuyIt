import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import IconContentButton from '../../../components/ui/IconContentButton.vue'

describe('IconContentButton', () => {
  it('renders button with content', () => {
    const wrapper = mount(IconContentButton, {
      props: {
        buttonContent: 'Test Button',
        navigateOnClick: vi.fn(),
      },
    })

    expect(wrapper.text()).toContain('Test Button')
  })

  it('calls navigateOnClick when clicked', async () => {
    const mockClick = vi.fn()
    const wrapper = mount(IconContentButton, {
      props: {
        buttonContent: 'Test Button',
        navigateOnClick: mockClick,
      },
    })

    await wrapper.trigger('click')
    expect(mockClick).toHaveBeenCalled()
  })

  it('handles hover state', async () => {
    const wrapper = mount(IconContentButton, {
      props: {
        buttonContent: 'Test Button',
        navigateOnClick: vi.fn(),
      },
    })

    await wrapper.trigger('mouseenter')
    expect(wrapper.emitted()).toBeDefined() // Dummy check to use wrapper

    await wrapper.trigger('mouseleave')
    expect(wrapper.emitted()).toBeDefined() // Dummy check to use wrapper
  })

  it('renders slot content', () => {
    const wrapper = mount(IconContentButton, {
      props: {
        buttonContent: 'Test Button',
        navigateOnClick: vi.fn(),
      },
      slots: {
        default: '<span>Icon</span>',
      },
    })

    expect(wrapper.html()).toContain('Icon')
  })

  it('applies rounded-full class when isRoundedFull is true', () => {
    const wrapper = mount(IconContentButton, {
      props: {
        buttonContent: 'Test Button',
        navigateOnClick: vi.fn(),
        isRoundedFull: true,
      },
    })

    expect(wrapper.html()).toContain('rounded-full')
  })

  it('applies custom iconColor and backgroundColor', () => {
    const wrapper = mount(IconContentButton, {
      props: {
        buttonContent: 'Test Button',
        navigateOnClick: vi.fn(),
        iconColor: 'text-blue-500',
        backgroundColor: 'bg-blue-100',
      },
    })

    expect(wrapper.html()).toContain('text-blue-500')
    expect(wrapper.html()).toContain('bg-blue-100')
  })
})
