export interface CartItem {
  id: number
  title: string
  image: string
  price: number
  oldPrice?: number
  quantity: number
  checked: boolean
}
