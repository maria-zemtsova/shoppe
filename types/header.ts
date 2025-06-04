import type { DefineComponent } from 'vue'

export interface MenuLink {
  id: number
  path: string
  label: string
}

export interface IconLink {
  id: number
  component: DefineComponent<{}, {}, any>
  label: string
  path: string
}
