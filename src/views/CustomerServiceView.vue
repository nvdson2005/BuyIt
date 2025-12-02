<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue'
import PageFooter from '@/components/layout/PageFooter.vue'
import { HelpCircle, ShoppingCart, Truck, RotateCcw, Phone } from 'lucide-vue-next'
import { ref } from 'vue'
import apiClient from '@/api/client'
const supportForm = ref({
  email: '',
  type: '',
  message: '',
})

async function submitSupportForm() {
  await apiClient
    .post('/support/add-message', {
      email: supportForm.value.email,
      type: supportForm.value.type,
      message: supportForm.value.message,
    })
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<template>
  <div class="min-h-screen bg-(--light-pink) flex flex-col">
    <NavBar />
    <div class="flex-1 w-full flex justify-center py-10">
      <div class="w-[80%] max-w-6xl space-y-8">
        <h1 class="text-3xl font-bold text-slate-800 mb-8">Customer Service</h1>

        <!-- Help Center -->
        <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <HelpCircle class="w-6 h-6 text-blue-600" />
            </div>
            <h2 class="text-2xl font-semibold text-slate-800">Help Center</h2>
          </div>
          <div class="space-y-6 text-slate-700">
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Account Management</h3>
              <p class="text-slate-600 mb-2">
                Manage your BuyIt account easily through your profile page. You can update your
                personal information, change your password, manage addresses, and update payment
                methods all in one place.
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>Update your profile information including name, email, and phone number</li>
                <li>Change your account password securely</li>
                <li>Add, edit, or remove shipping addresses</li>
                <li>Manage your payment methods and billing information</li>
                <li>View your order history and track current orders</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Order Tracking</h3>
              <p class="text-slate-600 mb-2">
                Stay informed about your order status from purchase to delivery. You can track your
                orders in real-time through your account dashboard.
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>View all your orders in the Orders section of your profile</li>
                <li>Track shipping status and delivery updates</li>
                <li>Receive email notifications at each stage of your order</li>
                <li>Access tracking numbers for shipped items</li>
                <li>View estimated delivery dates</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Product Information</h3>
              <p class="text-slate-600 mb-2">
                Get detailed information about products before making a purchase. Our product pages
                include comprehensive details to help you make informed decisions.
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>View high-resolution product images and descriptions</li>
                <li>Read customer reviews and ratings</li>
                <li>Check product specifications and dimensions</li>
                <li>Compare prices and check for discounts</li>
                <li>See seller information and ratings</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Troubleshooting Guides</h3>
              <p class="text-slate-600 mb-2">
                Common issues and their solutions to help you resolve problems quickly without
                needing to contact support.
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>Forgot password? Use the password reset feature on the login page</li>
                <li>
                  Can't find your order? Check your email for order confirmation or contact support
                </li>
                <li>Payment issues? Verify your payment method and billing address</li>
                <li>Website not loading? Clear your browser cache and cookies</li>
                <li>Product not as described? Contact us within 7 days for returns</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- How to Buy -->
        <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <ShoppingCart class="w-6 h-6 text-green-600" />
            </div>
            <h2 class="text-2xl font-semibold text-slate-800">How to Buy</h2>
          </div>
          <div class="space-y-6 text-slate-700">
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Step 1: Creating an Account</h3>
              <p class="text-slate-600 mb-2">
                To start shopping on BuyIt, you'll need to create an account. This allows you to
                track orders, save your preferences, and enjoy a personalized shopping experience.
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>Click on "Sign Up" in the top navigation bar</li>
                <li>Fill in your email address, username, and password</li>
                <li>Verify your email address through the confirmation link sent to your inbox</li>
                <li>
                  Complete your profile with additional information (optional but recommended)
                </li>
                <li>You're now ready to start shopping!</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Step 2: Browsing Products</h3>
              <p class="text-slate-600 mb-2">
                Explore our wide selection of products across various categories. Use our search and
                filter features to find exactly what you're looking for.
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>Browse by category from the homepage or category menu</li>
                <li>Use the search bar to find specific products</li>
                <li>Apply filters for price range, ratings, and other criteria</li>
                <li>Sort products by price, popularity, or newest arrivals</li>
                <li>Click on any product to view detailed information</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Step 3: Adding to Cart</h3>
              <p class="text-slate-600 mb-2">
                Once you've found a product you like, add it to your shopping cart. You can continue
                shopping or proceed to checkout.
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>Select product variants (size, color, etc.) if available</li>
                <li>Choose the quantity you want to purchase</li>
                <li>Click "Add to Cart" button on the product page</li>
                <li>View your cart by clicking the cart icon in the navigation bar</li>
                <li>Review items in your cart and adjust quantities as needed</li>
                <li>Apply discount codes or vouchers if you have any</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Step 4: Completing Checkout</h3>
              <p class="text-slate-600 mb-2">
                Finalize your purchase by providing shipping and payment information. The checkout
                process is secure and straightforward.
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>Click "Checkout" from your cart page</li>
                <li>Select or add a shipping address</li>
                <li>Choose your preferred shipping method</li>
                <li>
                  Select a payment method (credit card, debit card, or other available options)
                </li>
                <li>Review your order summary including items, prices, and shipping costs</li>
                <li>Confirm your order and wait for order confirmation email</li>
                <li>Track your order status from your account dashboard</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">
                Tips for a Smooth Shopping Experience
              </h3>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>Save your shipping addresses for faster checkout</li>
                <li>Add multiple payment methods for convenience</li>
                <li>Check for available discounts and promotional codes</li>
                <li>Read product reviews before making a purchase</li>
                <li>Compare prices across different sellers for the same product</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Shipping & Delivery -->
        <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <Truck class="w-6 h-6 text-orange-600" />
            </div>
            <h2 class="text-2xl font-semibold text-slate-800">Shipping & Delivery</h2>
          </div>
          <div class="space-y-6 text-slate-700">
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Shipping Methods</h3>
              <p class="text-slate-600 mb-2">
                We offer multiple shipping options to suit your needs. Choose the method that works
                best for you during checkout.
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>
                  <strong>Standard Shipping:</strong> 5-7 business days - Most economical option
                </li>
                <li>
                  <strong>Express Shipping:</strong> 2-3 business days - Faster delivery for urgent
                  orders
                </li>
                <li>
                  <strong>Overnight Shipping:</strong> Next business day - For time-sensitive
                  deliveries
                </li>
                <li>
                  <strong>International Shipping:</strong> 10-15 business days - Available to select
                  countries
                </li>
                <li>
                  <strong>Free Shipping:</strong> Available on orders over $50 (standard shipping
                  only)
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Delivery Timeframes</h3>
              <p class="text-slate-600 mb-2">
                Delivery times vary based on your location, shipping method selected, and product
                availability. Here's what to expect:
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>Processing time: 1-2 business days after order confirmation</li>
                <li>Standard shipping: 5-7 business days after processing</li>
                <li>Express shipping: 2-3 business days after processing</li>
                <li>Overnight shipping: Next business day after processing</li>
                <li>International orders: 10-15 business days after processing</li>
                <li>Note: Delivery times may be extended during holidays and peak seasons</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Order Tracking</h3>
              <p class="text-slate-600 mb-2">
                Stay updated on your order's journey from our warehouse to your doorstep. Tracking
                information is available once your order ships.
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>Receive tracking number via email once your order ships</li>
                <li>Track your order status in real-time from your account dashboard</li>
                <li>View estimated delivery date and current location</li>
                <li>Get SMS notifications for delivery updates (if opted in)</li>
                <li>Contact carrier directly using the provided tracking number</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Shipping Costs</h3>
              <p class="text-slate-600 mb-2">
                Shipping costs are calculated based on your location, order weight, and selected
                shipping method. Transparent pricing ensures you know exactly what you're paying.
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>Standard shipping: $5.99 (Free on orders over $50)</li>
                <li>Express shipping: $12.99</li>
                <li>Overnight shipping: $24.99</li>
                <li>International shipping: Varies by country (calculated at checkout)</li>
                <li>Shipping costs are displayed before you complete your purchase</li>
                <li>Some sellers may offer free shipping on their products</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Delivery Information</h3>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>We deliver to residential and business addresses</li>
                <li>Signature may be required for high-value orders</li>
                <li>
                  If you're not available, packages will be left in a safe location or returned to
                  carrier facility
                </li>
                <li>You can request delivery instructions during checkout</li>
                <li>
                  Contact us if you need to change your delivery address after order placement
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Return & Refunds -->
        <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <RotateCcw class="w-6 h-6 text-purple-600" />
            </div>
            <h2 class="text-2xl font-semibold text-slate-800">Return & Refunds</h2>
          </div>
          <div class="space-y-6 text-slate-700">
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Return Policy</h3>
              <p class="text-slate-600 mb-2">
                We want you to be completely satisfied with your purchase. Our return policy is
                designed to make the process as easy as possible.
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li><strong>Return Window:</strong> 30 days from the date of delivery</li>
                <li>
                  <strong>Condition:</strong> Items must be unused, unwashed, and in original
                  packaging with tags attached
                </li>
                <li>
                  <strong>Eligible Items:</strong> Most products are returnable (some exceptions
                  apply)
                </li>
                <li>
                  <strong>Non-Returnable Items:</strong> Perishable goods, personalized items,
                  intimate apparel, and digital products
                </li>
                <li>
                  <strong>Return Authorization:</strong> Contact customer service or initiate return
                  through your account
                </li>
                <li>
                  <strong>Return Shipping:</strong> Free returns on most items (check product page
                  for details)
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">How to Return an Item</h3>
              <p class="text-slate-600 mb-2">
                Follow these simple steps to return an item you're not satisfied with:
              </p>
              <ol class="list-decimal list-inside text-slate-600 space-y-1 ml-4">
                <li>Log into your account and go to the Orders section</li>
                <li>Find the order containing the item you want to return</li>
                <li>Click "Return Item" and select the reason for return</li>
                <li>Print the prepaid return shipping label (if applicable)</li>
                <li>Package the item securely in its original packaging</li>
                <li>Attach the return label and drop off at the carrier location</li>
                <li>Track your return status in your account</li>
              </ol>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Refund Process</h3>
              <p class="text-slate-600 mb-2">
                Once we receive and inspect your returned item, we'll process your refund promptly.
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>
                  <strong>Inspection Time:</strong> 2-3 business days after we receive your return
                </li>
                <li><strong>Refund Method:</strong> Refunded to your original payment method</li>
                <li>
                  <strong>Processing Time:</strong> 5-10 business days after approval (varies by
                  payment method)
                </li>
                <li>
                  <strong>Refund Amount:</strong> Full refund for eligible items, excluding original
                  shipping costs (unless item was defective)
                </li>
                <li><strong>Store Credit:</strong> Available as an option for faster processing</li>
                <li>
                  <strong>Notification:</strong> You'll receive an email confirmation when your
                  refund is processed
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Return Conditions</h3>
              <p class="text-slate-600 mb-2">
                To ensure your return is processed smoothly, please ensure items meet these
                conditions:
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>Items must be in original condition - unused, unwashed, and unworn</li>
                <li>Original tags and labels must be attached</li>
                <li>Items must be in original packaging with all accessories included</li>
                <li>Electronics must include all original cables, manuals, and warranty cards</li>
                <li>Items damaged by misuse or normal wear are not eligible for return</li>
                <li>Proof of purchase (order number) must be included</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Exchange Policy</h3>
              <p class="text-slate-600 mb-2">
                Need a different size or color? We offer exchanges for most items.
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>Exchanges must be requested within 30 days of delivery</li>
                <li>Exchanged items must be in stock and available</li>
                <li>You'll be responsible for return shipping costs for exchanges</li>
                <li>Price differences will be charged or refunded accordingly</li>
                <li>Contact customer service to initiate an exchange</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Defective or Damaged Items</h3>
              <p class="text-slate-600 mb-2">
                If you receive a defective or damaged item, we'll make it right immediately.
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>Contact us within 7 days of delivery for defective items</li>
                <li>Provide photos of the damage or defect</li>
                <li>We'll arrange for a replacement or full refund</li>
                <li>Return shipping is free for defective items</li>
                <li>We may request the item be returned for inspection</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Contact Us Section -->
        <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <Phone class="w-6 h-6 text-red-600" />
            </div>
            <h2 class="text-2xl font-semibold text-slate-800">Contact Us</h2>
          </div>
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Customer Support</h3>
              <p class="text-slate-600 mb-4">
                Our dedicated customer support team is available around the clock to assist you with
                any questions, concerns, or issues you may have. We're committed to providing
                exceptional service and ensuring your satisfaction.
              </p>
              <div class="bg-slate-50 rounded-lg p-6 space-y-3">
                <div class="flex items-start gap-3">
                  <strong class="text-slate-700 min-w-[100px]">Email:</strong>
                  <div>
                    <p class="text-slate-600">support@buyit.com</p>
                    <p class="text-sm text-slate-500">For general inquiries and support</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <strong class="text-slate-700 min-w-[100px]">Phone:</strong>
                  <div>
                    <p class="text-slate-600">1-800-BUYIT-NOW (1-800-289-4866)</p>
                    <p class="text-sm text-slate-500">Toll-free number available 24/7</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <strong class="text-slate-700 min-w-[100px]">Hours:</strong>
                  <div>
                    <p class="text-slate-600">24/7 Support</p>
                    <p class="text-sm text-slate-500">Our team is always ready to help</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <strong class="text-slate-700 min-w-[100px]">Response Time:</strong>
                  <div>
                    <p class="text-slate-600">Email: Within 24 hours</p>
                    <p class="text-slate-600">Phone: Immediate assistance</p>
                    <p class="text-slate-600">Live Chat: Real-time support</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Send us a Message</h3>
              <p class="text-slate-600 mb-4">
                Fill out the form below and we'll get back to you as soon as possible. Please
                provide as much detail as possible so we can assist you effectively.
              </p>
              <form class="space-y-4 bg-slate-50 rounded-lg p-6">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-2">Your Email *</label>
                  <input
                    v-model="supportForm.email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    class="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-2">Subject *</label>
                  <select
                    required
                    v-model="supportForm.type"
                    class="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="order">Order Inquiry</option>
                    <option value="shipping">Shipping & Delivery</option>
                    <option value="return">Return & Refund</option>
                    <option value="product">Product Question</option>
                    <option value="account">Account Issue</option>
                    <option value="payment">Payment Problem</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-2"
                    >Your Message *</label
                  >
                  <textarea
                    v-model="supportForm.message"
                    placeholder="Please describe your inquiry in detail..."
                    rows="6"
                    required
                    class="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  class="bg-(--red) text-white px-8 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors w-full md:w-auto"
                  @click="
                    (e) => {
                      e.preventDefault()
                      submitSupportForm()
                    }
                  "
                >
                  Send Message
                </button>
              </form>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Other Ways to Reach Us</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Live Chat</h4>
                  <p class="text-sm text-slate-600">
                    Available on our website - click the chat icon in the bottom right corner
                  </p>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Social Media</h4>
                  <p class="text-sm text-slate-600">
                    Follow us on Facebook, Twitter, and Instagram for updates and support
                  </p>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Business Inquiries</h4>
                  <p class="text-sm text-slate-600">
                    Email: business@buyit.com for partnership opportunities
                  </p>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Press & Media</h4>
                  <p class="text-sm text-slate-600">Email: press@buyit.com for media inquiries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PageFooter />
  </div>
</template>

<style scoped></style>
