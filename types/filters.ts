export interface Filters {
  searchQuery: string
  category: string
  sortBy: string
  priceRange: [number, number]
  inStock: boolean
  discountPercentage: number
}
