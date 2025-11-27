import router from '@/router'
export function navigateToProduct(productId: string) {
  console.log('Navigating to product with ID:', productId)
  router.push({ name: 'product', params: { id: productId } })
}
