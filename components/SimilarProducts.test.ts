import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import SimilarProducts from '~/components/SimilarProducts.vue'
import { useCartStore } from '~/stores/cart'
import type { Product } from '~/types/product'

const product: Product = {
  id: 1,
  title: 'Test Product',
  description: 'This is a test product',
  price: 99,
  category: 'Electronics',
  image: 'test.jpg',
  rating: { rate: 4.5, count: 100 },
  discountPercentage: 10,
}

vi.stubGlobal(
  'fetch',
  vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([product]),
    }),
  ),
)

describe('SimilarProducts.vue', () => {
  let pinia: ReturnType<typeof createPinia>

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    const cart = useCartStore()
    cart.increaseQuantity = vi.fn()
  })

  it('renders image, title and price of similar product', async () => {
    const wrapper = mount(SimilarProducts, {
      props: { category: 'Electronics', currentId: 2 },
      global: {
        plugins: [pinia],
      },
    })

    await flushPromises()

    const slide = wrapper.find('.similars__slide')
    expect(slide.exists()).toBe(true)

    const img = slide.find('.card__image')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe(product.image)

    const title = slide.find('.card__product-title')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe(product.title)

    const price = slide.find('.card__price')
    expect(price.exists()).toBe(true)
    expect(price.text()).toBe(`$ ${product.price}`)
  })
})
