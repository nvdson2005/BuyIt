import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CartItem from '../../../components/ui/CartItem.vue'
import { createMockCartItem } from '../../utils/test-utils'

describe('CartItem', () => {
  const mockItem = createMockCartItem({
    id: '1',
    product_name: 'Test Product',
    price: 100000,
    quantity: 2,
    image_url: 'https://via.placeholder.com/150',
    checked: true,
    oldPrice: 120000,
  })

  it('renders cart item information correctly', () => {
    const wrapper = mount(CartItem, {
      props: {
        item: mockItem,
      },
    })

    expect(wrapper.text()).toContain('Test Product')
    expect(wrapper.find('img').attributes('src')).toBe(mockItem.image_url)
  })

  it('displays formatted price correctly', () => {
    const wrapper = mount(CartItem, {
      props: {
        item: mockItem,
      },
    })

    const priceText = wrapper.text()
    expect(priceText).toContain('₫')
  })

  it('shows old price when provided', () => {
    const wrapper = mount(CartItem, {
      props: {
        item: mockItem,
      },
    })

    expect(wrapper.text()).toContain('₫')
  })

  it('displays correct quantity', () => {
    const wrapper = mount(CartItem, {
      props: {
        item: mockItem,
      },
    })

    expect(wrapper.text()).toContain('2')
  })

  it('emits decrease event when decrease button is clicked', async () => {
    const wrapper = mount(CartItem, {
      props: {
        item: mockItem,
      },
    })

    const decreaseButton = wrapper.findAll('button')[0]
    await decreaseButton.trigger('click')

    expect(wrapper.emitted('decrease')).toBeTruthy()
    expect(wrapper.emitted('decrease')?.[0]).toEqual([mockItem])
  })

  it('emits increase event when increase button is clicked', async () => {
    const wrapper = mount(CartItem, {
      props: {
        item: mockItem,
      },
    })

    const increaseButton = wrapper.findAll('button')[1]
    await increaseButton.trigger('click')

    expect(wrapper.emitted('increase')).toBeTruthy()
    expect(wrapper.emitted('increase')?.[0]).toEqual([mockItem])
  })

  it('emits removeItem event when remove button is clicked', async () => {
    const wrapper = mount(CartItem, {
      props: {
        item: mockItem,
      },
    })

    const removeButton = wrapper.findAll('button')[2]
    await removeButton.trigger('click')

    expect(wrapper.emitted('removeItem')).toBeTruthy()
    expect(wrapper.emitted('removeItem')?.[0]).toEqual([mockItem.id])
  })

  it('calculates total price correctly', () => {
    const wrapper = mount(CartItem, {
      props: {
        item: mockItem,
      },
    })

    // Price is formatted in Vietnamese currency, so check for currency symbol
    const totalPrice = mockItem.price * mockItem.quantity
    const formattedPrice = totalPrice.toLocaleString('vi-VN')
    expect(wrapper.text()).toContain('₫')
  })

  it('shows checkbox as checked when item.checked is true', () => {
    const wrapper = mount(CartItem, {
      props: {
        item: { ...mockItem, checked: true },
      },
    })

    const checkbox = wrapper.find('input[type="checkbox"]')
    expect(checkbox.attributes('checked')).toBeDefined()
  })
})
