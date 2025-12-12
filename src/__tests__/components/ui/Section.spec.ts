import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Section from '../../../components/ui/Section.vue'

describe('Section', () => {
  it('renders section with title', () => {
    const wrapper = mount(Section, {
      props: {
        title: 'Test Section',
      },
    })

    expect(wrapper.text()).toContain('Test Section')
  })

  it('renders slot content', () => {
    const wrapper = mount(Section, {
      props: {
        title: 'Test Section',
      },
      slots: {
        default: '<div>Slot Content</div>',
      },
    })

    expect(wrapper.text()).toContain('Slot Content')
  })

  it('renders without title when title is not provided', () => {
    const wrapper = mount(Section, {
      slots: {
        default: '<div>Content</div>',
      },
    })

    expect(wrapper.text()).toContain('Content')
  })
})
