export interface CartItem {
  id: number
  title: string
  image: string
  price: number
  oldPrice?: number
  quantity: number
  checked: boolean
}

export interface Product {
  id: number
  name: string
  description: string
  image: string
  price: number
  sale_price: number
  rating: number
  sold_amount: number
  stock: number
  shop_id: number
  sub_category_id: number
}
