import '@testing-library/jest-dom'
import { vi } from 'vitest'

vi.mock('#components', () => ({
  NuxtLink: { template: '<a><slot /></a>' },
  BaseButton: { template: '<button><slot /></button>' },
  BaseTabs: { template: '<div><slot /></div>' },
  BaseAccordeon: { template: '<div><slot /></div>' },
}))
