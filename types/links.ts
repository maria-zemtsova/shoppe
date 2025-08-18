import type { DefineComponent } from 'vue'

export interface LinkItem {
  id: number
  component?: DefineComponent
  label: string
  path?: string
  action?: void
}
