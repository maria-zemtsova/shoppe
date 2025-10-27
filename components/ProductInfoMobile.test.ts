import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import ProductInfoMobile from '~/components/ProductInfoMobile.vue'
import type { Product } from '~/types/product'
import type { LinkItem } from '~/types/links'
import '@testing-library/jest-dom'

vi.mock('~/components/ProductDetailActions.vue', () => ({
  default: {
    name: 'ProductDetailActions',
    template: '<div data-testid="product-actions"></div>',
    props: ['product'],
  },
}))

const product: Product = {
  id: 1,
  title: 'Test Product',
  description: 'This is a test product',
  price: 99,
  category: 'Electronics',
  image: 'test.jpg',
  rating: {
    rate: 4.5,
    count: 100,
  },
  discountPercentage: 10,
}

const productSocials: LinkItem[] = []

describe('ProductInfoMobile', () => {
  it('renders all product information correctly', () => {
    const wrapper = mount(ProductInfoMobile, {
      props: {
        product,
        productSocials,
      },
    })

    const title = wrapper.find('.info__title')
    expect(title).toBeTruthy()
    expect(title.text()).toBe(product.title)

    const price = wrapper.find('.info__price')
    expect(price).toBeTruthy()
    expect(price.text()).toBe(`$ ${product.price}`)

    const description = wrapper.find('.info__description')
    expect(description).toBeTruthy()
    expect(description.text()).toBe(product.description)

    const category = wrapper.find('.info__category span')
    expect(category).toBeTruthy()
    expect(category.text()).toBe(product.category)
  })
})
