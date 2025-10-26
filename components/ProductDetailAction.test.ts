import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import QuantityCounter from '~/components/ui/QuantityCounter.vue'
import BaseButton from '~/components/ui/BaseButton.vue'

vi.mock('#components', () => ({
  NuxtLink: { template: '<a><slot /></slot></a>' },
}))

describe('QuantityCounter.vue', () => {
  it('increments and decrements the quantity', async () => {
    const wrapper = mount(QuantityCounter, {
      props: { modelValue: 1 },
      global: { components: { BaseButton } },
    })

    const [decrementButton, incrementButton] = wrapper.findAll('.quantity__button')
    const quantityText = () => wrapper.find('p').text()
    expect(quantityText()).toBe('1')
    await incrementButton.trigger('click')
    expect(quantityText()).toBe('2')
    await incrementButton.trigger('click')
    expect(quantityText()).toBe('3')
    await decrementButton.trigger('click')
    expect(quantityText()).toBe('2')
    await decrementButton.trigger('click')
    await decrementButton.trigger('click')
    expect(quantityText()).toBe('1')
  })
})
