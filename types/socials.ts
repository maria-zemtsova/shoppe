import type { DefineComponent } from 'vue'

export interface Social {
  id: number
  component: DefineComponent
  label: string
  path: string
}
