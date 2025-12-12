import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import VoucherCard from '../../../components/ui/VoucherCard.vue'
import apiClient from '../../../api/client'

vi.mock('@/api/client', () => ({
  default: {
    post: vi.fn(),
  },
}))

vi.mock('@/utils/notify', () => ({
  notify: vi.fn(),
  notifyAsync: vi.fn((promise) => promise),
}))

describe('VoucherCard', () => {
  const defaultProps = {
    id: 'voucher1',
    amount: 10,
    minAmount: 100,
    maxAmount: 50,
    limit: 100,
    discountType: 'percentage',
    startDate: new Date(),
    expiryDate: new Date(Date.now() + 86400000),
    isClaimed: false,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders voucher card with percentage discount', () => {
    const wrapper = mount(VoucherCard, {
      props: defaultProps,
    })

    expect(wrapper.text()).toContain('10%')
    expect(wrapper.text()).toContain('Shop Voucher')
  })

  it('renders voucher card with fixed amount discount', () => {
    const wrapper = mount(VoucherCard, {
      props: {
        ...defaultProps,
        discountType: 'fixed_amount',
      },
    })

    expect(wrapper.text()).toContain('10đ')
  })

  it('displays minimum spend amount', () => {
    const wrapper = mount(VoucherCard, {
      props: defaultProps,
    })

    expect(wrapper.text()).toContain('Min. Spend: 100đ')
  })

  it('displays expiry date', () => {
    const wrapper = mount(VoucherCard, {
      props: defaultProps,
    })

    expect(wrapper.text()).toContain('Expiry Date:')
  })

  it('displays max amount for percentage discounts', () => {
    const wrapper = mount(VoucherCard, {
      props: defaultProps,
    })

    expect(wrapper.text()).toContain('Capped at: 50đ')
  })

  it('disables claim button when already claimed', () => {
    const wrapper = mount(VoucherCard, {
      props: {
        ...defaultProps,
        isClaimed: true,
      },
    })

    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()
  })

  it('claims voucher successfully', async () => {
    vi.mocked(apiClient.post).mockResolvedValue({ data: {} })

    const wrapper = mount(VoucherCard, {
      props: defaultProps,
    })

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(apiClient.post).toHaveBeenCalledWith('buyer/user-voucher', {
      voucherId: 'voucher1',
    })
    expect(wrapper.vm.isClaimed).toBe(true)
  })

  it('handles claim voucher error', async () => {
    vi.mocked(apiClient.post).mockRejectedValue(new Error('Failed'))

    const wrapper = mount(VoucherCard, {
      props: defaultProps,
    })

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.vm.isClaimed).toBe(false)
  })
})
