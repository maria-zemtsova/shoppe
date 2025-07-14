declare module 'vue-skeleton-loader' {
  import { DefineComponent } from 'vue'

  const skeletonLoader: DefineComponent<{
    width?: number | string
    height?: number | string
    speed?: number
    primaryColor?: string
    secondaryColor?: string
  }>

  export default skeletonLoader
}
