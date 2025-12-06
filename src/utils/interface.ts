export interface CartItem {
  id: string
  quantity: number
  prod_id: string
  prod_var_id: string
  variant_name: string
  price: number
  image_url: string
  product_name: string
  stock_quantity: number
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
  sub_category_id: string
  shop_name?: string
  sub_category_name?: string
  category_name?: string
}

// Response shape for GET /products/info/:id
export interface ProductInfoResponse {
  error: boolean
  product: ApiProduct
}

// Attributes on product (API shape)
export interface ApiProductAttributeValue {
  attribute_value_id: string
  value: string
}

export interface ApiProductAttribute {
  id: string
  name: string
  values: ApiProductAttributeValue[]
}

// Attributes on variant (API shape)
export interface ApiProductVariantAttributeValue {
  attribute_value_id: string
  attribute_name: string
  value: string
}

export interface ApiProductVariant {
  variant_id: string
  name: string
  price: number
  image_url: string
  stock_quantity: number | string
  attribute_values: ApiProductVariantAttributeValue[]
}

// Product (API shape)
export interface ApiProduct {
  id: string
  shop_id: string
  name: string
  description: string
  rating: number
  price: number
  sale_price: number
  sold_amount: number | string
  stock_quantity: number | string
  image_url: string
  created_at: string
  updated_at: string
  is_active: boolean
  sub_category_id: string
  is_onsale: boolean
  shop_name?: string
  sub_category_name?: string
  attributes: ApiProductAttribute[]
  variants: ApiProductVariant[]
}

export interface Review {
  id: string
  product_id: string
  product_variant_id?: string
  buyer_id: string
  rating: number
  comment: string
  created_at: string
  image_url: string
  variant_name?: string
  buyer_name?: string
  buyer_avatar_url?: string
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
  address_id: string
  user_id: string
  full_name: string
  street: string
  ward: string
  district: string
  city: string
  state: string
  zipcode: string
  phone_number: string
  created_at: Date
  updated_at: Date
  is_default: boolean
}

export interface Payment {
  method_name: 'Cash' | 'Online Banking'
  method_id: string
  option_id: string
}

export interface PaymentMethod {
  name: 'Cash' | 'Online Banking'
  method_id: string
  option_id: string
  account_number: string
  is_default: boolean
}

export interface ProfileDetail {
  username: string
  name: string
  phone: string
  email: string
  description: string
}

export interface SellerProduct {
  id: string
  name: string
  description: string
  rating: number
  price: number
  sold_amount: number
  stock_quantity: number
  image_url: string
  is_active: boolean
  sub_category_id: string
  sale_price: number
  is_onsale: boolean
  variants: ProductVariant[]
}

export interface SellerProductShow {
  id: string
  name: string
  description: string
  rating: number
  price: number
  sold_amount: number
  stock_quantity: number
  image_url: string
  is_active: boolean
  sub_category_id: string
  sale_price: number
  is_onsale: boolean
  status_op: string
}

export interface Category {
  category_id: string
  name: string
}

export interface Voucher {
  voucher_id: string
  shop_id: string | null
  code: string
  description: string
  discount_amount: number
  min_amount_to_apply: number
  max_discount_amount: number
  usage_limit: number
  discount_type: 'percentage' | 'fixed_amount'
  applicable_scope: 'shop' | 'platform'
  program_name: string
  start_date: Date
  expiry_date: Date
  is_active: boolean
}

export interface Subcategory {
  id: string
  name: string
  category_id: string
}
export interface SellerOrderItem {
  order_id: string
  product_id: string
  variant_id: string
  product_name: string
  variant_name: string
  image_url: string
  order_item_id: string
  quantity: number
  total_amount: number
  order_status: string
  order_date: Date
  carrier_id: string
  carrier_name: string
  shipment_id: string
  ship_status: string
  actual_deliver_date: Date | null
}

export interface SellerOrder {
  order_id: string
  order_status: string
  order_date: Date
  actual_deliver_date: Date | null
  ship_status: string
  carrier_name: string
  order_items: SellerOrderItem[]
  selected: boolean
}

export interface OrderItem{
  order_item_id: string
  prod_id: string
  prod_var_id: string
  quantity: number
  unit_price: number
  subtotal: number
  productVariant: ProductVariant
  product: Product
}

export interface BuyerOrder{
  order_id: string
  addr_id: string
  order_date: Date
  total_amount: number
  updated_at: Date
  buyer_id: string
  order_status: string
  is_reviewed: boolean
  orderitems: OrderItem[]
}


export interface Notification {
  id: string
  title: string
  body: string
  created_at: Date
  is_read: boolean
}


export interface UserVoucher {
  id: string
  buyer_id: string
  voucher_id: string
  claim_date: Date
  used_date: Date
  is_used: boolean
}
