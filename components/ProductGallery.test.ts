import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ProductGallery from '~/components/ProductGallery.vue'

describe('ProductGallery.vue', () => {
  it('checks the product gallery component', () => {
    const wrapper = mount(ProductGallery)
    const images = wrapper.findAll('img')
    const galleryMain = wrapper.find('.gallery__main')
    expect(images.length).toBeGreaterThan(0)
    expect(galleryMain.exists()).toBeTruthy()
  })
})
