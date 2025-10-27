// tests/components/BaseTabs.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTabs from '~/components/ui/BaseTabs.vue'
import { h, defineComponent } from 'vue'

describe('BaseTabs', () => {
  const tabOneContent = defineComponent({
    setup() {
      return () => h('p', 'Content One')
    },
  })

  const tabTwoContent = defineComponent({
    setup() {
      return () => h('p', 'Content Two')
    },
  })

  const tabs = [
    { title: 'Tab 1', component: tabOneContent },
    { title: 'Tab 2', component: tabTwoContent },
  ]

  it('renders first tab content by default', () => {
    const wrapper = mount(BaseTabs, {
      props: { items: tabs, modelValue: 0 },
    })

    expect(wrapper.text()).toContain('Content One')
  })

  it('changes content when clicking on another tab', async () => {
    const wrapper = mount(BaseTabs, {
      props: { items: tabs, modelValue: 0 },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(2)

    await buttons[1].trigger('click')

    expect(wrapper.text()).toContain('Content Two')
  })
})
