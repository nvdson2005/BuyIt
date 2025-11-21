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
  id: string
  name: string
  description: string
  image_url: string
  price: number
  sale_price: number
  rating: number
  sold_amount: number
  stock_quantity: number
  shop_id: string
  sub_category_id: number
}

export interface Shop {
  id: string
  name: string
  description: string
  rating: number
  followers: number
}

export interface ProductVariant {
  variant_id: string
  product_id: string
  name: string
  price: number
  stock_quantity: number
  image_url: string
}

export interface Address {
  id: number
  name: string
  phone: string
  address: string
  isDefault: boolean
}

export interface AllProductsViewProps {
  products: Product[]
  onAddNewProduct: () => void
}

export interface ProfileDetail {
  username: string
  name: string
  phone: string
  email: string
  description: string
}
