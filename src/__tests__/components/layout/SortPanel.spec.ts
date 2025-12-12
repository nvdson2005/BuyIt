import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SortPanel from '../../../components/layout/SortPanel.vue'
import { SortOption } from '../../../utils/enum'

describe('SortPanel', () => {
  it('renders sort panel with sort options', () => {
    const wrapper = mount(SortPanel)
    expect(wrapper.text()).toContain('Sort in:')
    expect(wrapper.text()).toContain('Most Sold')
  })

  it('emits sort-changed event when sort option is clicked', async () => {
    const wrapper = mount(SortPanel)

    const buttons = wrapper.findAll('button')
    const mostRatedButton = buttons.find((btn) => btn.text() === 'Most Rated')

    if (mostRatedButton) {
      await mostRatedButton.trigger('click')
      expect(wrapper.emitted('sort-changed')).toBeTruthy()
      expect(wrapper.emitted('sort-changed')?.[0]).toEqual([SortOption.MOST_RATED])
    }
  })

  it('highlights active sort option', () => {
    const wrapper = mount(SortPanel)

    const buttons = wrapper.findAll('button')
    const mostSoldButton = buttons.find((btn) => btn.text() === 'Most Sold')

    if (mostSoldButton) {
      expect(mostSoldButton.classes()).toContain('bg-[var(--orange)]')
    }
  })

  it('updates current sort when option is selected', async () => {
    const wrapper = mount(SortPanel)

    const buttons = wrapper.findAll('button')
    const mostRatedButton = buttons.find((btn) => btn.text() === 'Most Rated')

    if (mostRatedButton) {
      await mostRatedButton.trigger('click')
      expect(wrapper.emitted('sort-changed')).toBeTruthy()
    }
  })
})
