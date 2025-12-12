import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import SearchButton from '../../../components/ui/SearchButton.vue'
import router from '../../../router/index'

describe('SearchButton', () => {
  let testRouter: ReturnType<typeof createRouter>

  beforeEach(() => {
    testRouter = createRouter({
      history: createWebHistory(),
      routes: router.getRoutes(),
    })
  })

  it('renders search button', () => {
    const wrapper = mount(SearchButton, {
      props: {
        modelValue: '',
      },
      global: {
        plugins: [testRouter],
      },
    })

    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('navigates to search page with query when clicked', async () => {
    const pushSpy = vi.spyOn(testRouter, 'push')
    const wrapper = mount(SearchButton, {
      props: {
        modelValue: 'test query',
      },
      global: {
        plugins: [testRouter],
      },
    })

    await wrapper.find('button').trigger('click')

    expect(pushSpy).toHaveBeenCalledWith({
      name: 'search',
      query: { query: 'test query' },
    })
  })

  it('trims whitespace from search query', async () => {
    const pushSpy = vi.spyOn(testRouter, 'push')
    const wrapper = mount(SearchButton, {
      props: {
        modelValue: '  test query  ',
      },
      global: {
        plugins: [testRouter],
      },
    })

    await wrapper.find('button').trigger('click')

    expect(pushSpy).toHaveBeenCalledWith({
      name: 'search',
      query: { query: 'test query' },
    })
  })

  it('does not navigate when search query is empty', async () => {
    const pushSpy = vi.spyOn(testRouter, 'push')
    const wrapper = mount(SearchButton, {
      props: {
        modelValue: '',
      },
      global: {
        plugins: [testRouter],
      },
    })

    await wrapper.find('button').trigger('click')

    expect(pushSpy).not.toHaveBeenCalled()
  })

  it('does not navigate when search query is only whitespace', async () => {
    const pushSpy = vi.spyOn(testRouter, 'push')
    const wrapper = mount(SearchButton, {
      props: {
        modelValue: '   ',
      },
      global: {
        plugins: [testRouter],
      },
    })

    await wrapper.find('button').trigger('click')

    expect(pushSpy).not.toHaveBeenCalled()
  })

  it('handles Enter key press', async () => {
    const pushSpy = vi.spyOn(testRouter, 'push')
    const wrapper = mount(SearchButton, {
      props: {
        modelValue: 'test query',
      },
      global: {
        plugins: [testRouter],
      },
    })

    await wrapper.find('button').trigger('keydown.enter')

    expect(pushSpy).toHaveBeenCalledWith({
      name: 'search',
      query: { query: 'test query' },
    })
  })
})
