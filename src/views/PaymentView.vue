<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue'
import PageFooter from '@/components/layout/PageFooter.vue'
import { CreditCard, Gift, Tag, Ticket, Star } from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-screen bg-(--light-pink) flex flex-col">
    <NavBar />
    <div class="flex-1 w-full flex justify-center py-10">
      <div class="w-[80%] max-w-6xl space-y-8">
        <h1 class="text-3xl font-bold text-slate-800 mb-8">Payment & Rewards</h1>

        <!-- Payment Methods -->
        <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <CreditCard class="w-6 h-6 text-blue-600" />
            </div>
            <h2 class="text-2xl font-semibold text-slate-800">Payment Methods</h2>
          </div>
          <div class="space-y-6 text-slate-700">
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Accepted Payment Options</h3>
              <p class="text-slate-600 mb-4">
                At BuyIt, we offer a wide variety of secure payment methods to make your shopping
                experience as convenient as possible. All transactions are processed through
                encrypted, secure payment gateways to protect your financial information.
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Credit & Debit Cards</h4>
                  <ul class="text-sm text-slate-600 space-y-1">
                    <li>• Visa</li>
                    <li>• Mastercard</li>
                    <li>• American Express</li>
                    <li>• Discover</li>
                    <li>• Diners Club</li>
                  </ul>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Digital Wallets</h4>
                  <ul class="text-sm text-slate-600 space-y-1">
                    <li>• PayPal</li>
                    <li>• Apple Pay</li>
                    <li>• Google Pay</li>
                    <li>• Samsung Pay</li>
                    <li>• Amazon Pay</li>
                  </ul>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Bank Transfers</h4>
                  <ul class="text-sm text-slate-600 space-y-1">
                    <li>• ACH Direct Debit</li>
                    <li>• Wire Transfer</li>
                    <li>• Online Banking</li>
                  </ul>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Buy Now, Pay Later</h4>
                  <ul class="text-sm text-slate-600 space-y-1">
                    <li>• Klarna</li>
                    <li>• Afterpay</li>
                    <li>• Affirm</li>
                    <li>• Sezzle</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Security & Protection</h3>
              <p class="text-slate-600 mb-2">
                Your payment security is our top priority. We use industry-standard encryption and
                security measures to protect your financial information.
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>
                  <strong>SSL Encryption:</strong> All payment data is encrypted using 256-bit SSL
                  technology
                </li>
                <li>
                  <strong>PCI Compliance:</strong> We are PCI DSS Level 1 compliant, the highest
                  level of security certification
                </li>
                <li>
                  <strong>Tokenization:</strong> Payment information is tokenized and never stored
                  on our servers
                </li>
                <li>
                  <strong>Fraud Protection:</strong> Advanced fraud detection systems monitor all
                  transactions
                </li>
                <li>
                  <strong>Buyer Protection:</strong> Full refund protection for unauthorized
                  transactions
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Payment Processing</h3>
              <p class="text-slate-600 mb-2">
                Understanding how your payment is processed helps ensure a smooth checkout
                experience.
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>Payments are processed immediately upon order confirmation</li>
                <li>Credit card authorizations may take 1-3 business days to clear</li>
                <li>Digital wallet payments are processed instantly</li>
                <li>Bank transfers may take 2-5 business days to process</li>
                <li>You'll receive an email confirmation once payment is successfully processed</li>
                <li>Failed payments will be automatically retried, and you'll be notified</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">
                Currency & International Payments
              </h3>
              <p class="text-slate-600 mb-2">
                We support multiple currencies and international payment methods for global
                customers.
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>Primary currency: USD (US Dollar)</li>
                <li>Accepted currencies: EUR, GBP, CAD, AUD, JPY, and more</li>
                <li>Automatic currency conversion at checkout</li>
                <li>Exchange rates are updated in real-time</li>
                <li>International transaction fees may apply (check with your bank)</li>
                <li>Multi-currency support for select payment methods</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Gift Cards -->
        <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Gift class="w-6 h-6 text-green-600" />
            </div>
            <h2 class="text-2xl font-semibold text-slate-800">Gift Cards</h2>
          </div>
          <div class="space-y-6 text-slate-700">
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">About BuyIt Gift Cards</h3>
              <p class="text-slate-600 mb-4">
                BuyIt Gift Cards are the perfect gift for any occasion. They give recipients the
                freedom to choose exactly what they want from our extensive product catalog. Gift
                cards never expire and can be used for any purchase on our platform.
              </p>
              <p class="text-slate-600">
                Whether you're shopping for a birthday, holiday, or just want to show someone you
                care, a BuyIt Gift Card is always a welcome gift.
              </p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Gift Card Features</h3>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>
                  <strong>No Expiration:</strong> Gift cards never expire, so recipients can use
                  them whenever they're ready
                </li>
                <li><strong>Flexible Amounts:</strong> Choose any amount from $10 to $1,000</li>
                <li>
                  <strong>Instant Delivery:</strong> Digital gift cards are delivered instantly via
                  email
                </li>
                <li><strong>Physical Cards:</strong> Physical gift cards available for shipping</li>
                <li>
                  <strong>Partial Use:</strong> Use gift cards for partial payments and save the
                  balance for future purchases
                </li>
                <li>
                  <strong>Combine with Other Payments:</strong> Use gift cards together with credit
                  cards or other payment methods
                </li>
                <li>
                  <strong>No Fees:</strong> No activation fees, maintenance fees, or hidden charges
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">How to Use Gift Cards</h3>
              <p class="text-slate-600 mb-2">
                Using a BuyIt Gift Card is simple and straightforward. Follow these steps to redeem
                your gift card:
              </p>
              <ol class="list-decimal list-inside text-slate-600 space-y-1 ml-4">
                <li>Add items to your cart and proceed to checkout</li>
                <li>On the payment page, enter your gift card code in the designated field</li>
                <li>Click "Apply Gift Card" to add the balance to your order</li>
                <li>If the gift card covers the full amount, complete your order</li>
                <li>
                  If there's a remaining balance, use another payment method for the difference
                </li>
                <li>Any unused balance will remain on your gift card for future purchases</li>
              </ol>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Gift Card Balance</h3>
              <p class="text-slate-600 mb-2">
                You can check your gift card balance at any time through your account dashboard or
                during checkout.
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>View gift card balance in your account settings</li>
                <li>Check balance during checkout before applying the card</li>
                <li>See transaction history for all gift card uses</li>
                <li>Receive email notifications when gift card balance changes</li>
                <li>Combine multiple gift cards for a single purchase</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">
                Gift Card Terms & Conditions
              </h3>
              <p class="text-slate-600 mb-2">Important information about BuyIt Gift Cards:</p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>Gift cards cannot be redeemed for cash</li>
                <li>Gift cards are non-refundable and non-transferable</li>
                <li>
                  Lost or stolen gift cards cannot be replaced unless proof of purchase is provided
                </li>
                <li>Gift cards can be used for any product on BuyIt</li>
                <li>Gift cards cannot be used to purchase other gift cards</li>
                <li>If a purchase exceeds the gift card balance, additional payment is required</li>
                <li>Gift cards are subject to applicable laws and regulations</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Promotions -->
        <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <Tag class="w-6 h-6 text-orange-600" />
            </div>
            <h2 class="text-2xl font-semibold text-slate-800">Promotions</h2>
          </div>
          <div class="space-y-6 text-slate-700">
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Current Promotions</h3>
              <p class="text-slate-600 mb-4">
                BuyIt regularly offers exciting promotions and special deals to help you save on
                your favorite products. From seasonal sales to flash deals, there's always something
                special happening on our platform.
              </p>
              <p class="text-slate-600">
                Stay updated with our latest promotions by subscribing to our newsletter, following
                us on social media, or checking our promotions page regularly.
              </p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Types of Promotions</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Percentage Discounts</h4>
                  <p class="text-sm text-slate-600">
                    Save a percentage off your purchase, such as 20% off sitewide or 50% off select
                    categories
                  </p>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Dollar Amount Off</h4>
                  <p class="text-sm text-slate-600">
                    Get a fixed dollar amount off your order, like $10 off orders over $50
                  </p>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Buy One Get One</h4>
                  <p class="text-sm text-slate-600">
                    Special BOGO deals where you get additional items free or at a discount
                  </p>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Free Shipping</h4>
                  <p class="text-sm text-slate-600">
                    Promotions that include free shipping on qualifying orders
                  </p>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Flash Sales</h4>
                  <p class="text-sm text-slate-600">
                    Limited-time sales with deep discounts on select products
                  </p>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Seasonal Sales</h4>
                  <p class="text-sm text-slate-600">
                    Major sales events like Black Friday, Cyber Monday, and holiday sales
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">How Promotions Work</h3>
              <p class="text-slate-600 mb-2">
                Understanding how our promotions work helps you take full advantage of the savings:
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>Promotions are automatically applied at checkout if eligible</li>
                <li>Some promotions require a minimum purchase amount</li>
                <li>Promotions may be limited to specific products, categories, or brands</li>
                <li>Each promotion has specific terms and expiration dates</li>
                <li>Only one promotion can typically be applied per order</li>
                <li>Promotions cannot be combined with certain other offers</li>
                <li>Sale prices are clearly marked on product pages</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Staying Updated</h3>
              <p class="text-slate-600 mb-2">
                Never miss a great deal! Here's how to stay informed about our latest promotions:
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>Subscribe to our email newsletter for exclusive promotions</li>
                <li>Follow us on social media for flash sales and limited-time offers</li>
                <li>Check the promotions banner on our homepage</li>
                <li>Enable push notifications in our mobile app</li>
                <li>Visit our promotions page regularly</li>
                <li>Sign up for account alerts to receive promotion notifications</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Promotion Terms</h3>
              <p class="text-slate-600 mb-2">Important terms and conditions for our promotions:</p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>
                  Promotions are subject to availability and may end early if supplies run out
                </li>
                <li>We reserve the right to modify or cancel promotions at any time</li>
                <li>Promotions cannot be applied to previous purchases</li>
                <li>Some products may be excluded from promotions</li>
                <li>Promotions are valid only during the specified time period</li>
                <li>Quantities may be limited for certain promotional items</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Coupons -->
        <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Ticket class="w-6 h-6 text-purple-600" />
            </div>
            <h2 class="text-2xl font-semibold text-slate-800">Coupons</h2>
          </div>
          <div class="space-y-6 text-slate-700">
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">About BuyIt Coupons</h3>
              <p class="text-slate-600 mb-4">
                Coupons are special discount codes that you can apply at checkout to save money on
                your purchases. We offer various types of coupons throughout the year, from welcome
                discounts for new customers to special offers for loyal shoppers.
              </p>
              <p class="text-slate-600">
                Coupons are a great way to save on your favorite products, and we make it easy to
                find and use them.
              </p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Types of Coupons</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Welcome Coupons</h4>
                  <p class="text-sm text-slate-600">
                    Special discounts for new customers signing up for an account
                  </p>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Category Coupons</h4>
                  <p class="text-sm text-slate-600">
                    Discounts applicable to specific product categories
                  </p>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Brand Coupons</h4>
                  <p class="text-sm text-slate-600">
                    Special offers from specific brands or sellers
                  </p>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Seasonal Coupons</h4>
                  <p class="text-sm text-slate-600">
                    Limited-time coupons for holidays and special occasions
                  </p>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Loyalty Coupons</h4>
                  <p class="text-sm text-slate-600">
                    Exclusive coupons for repeat customers and loyalty members
                  </p>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Referral Coupons</h4>
                  <p class="text-sm text-slate-600">
                    Discounts earned by referring friends and family
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">How to Use Coupons</h3>
              <p class="text-slate-600 mb-2">
                Applying a coupon code is quick and easy. Follow these simple steps:
              </p>
              <ol class="list-decimal list-inside text-slate-600 space-y-1 ml-4">
                <li>Browse and add items to your shopping cart</li>
                <li>Proceed to checkout when you're ready to purchase</li>
                <li>On the checkout page, locate the "Coupon Code" or "Promo Code" field</li>
                <li>Enter your coupon code exactly as it appears (case-sensitive)</li>
                <li>Click "Apply" to validate and apply the coupon</li>
                <li>Verify that the discount has been applied to your order total</li>
                <li>Complete your purchase with the discounted price</li>
              </ol>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Finding Coupon Codes</h3>
              <p class="text-slate-600 mb-2">
                There are several ways to find valid coupon codes for BuyIt:
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>Check your email for exclusive coupon codes sent to subscribers</li>
                <li>Visit our coupons page on the website</li>
                <li>Look for coupon codes in our mobile app</li>
                <li>Follow us on social media for flash coupon codes</li>
                <li>Check your account dashboard for personalized coupons</li>
                <li>Sign up for our newsletter to receive coupon codes</li>
                <li>Refer friends to earn referral coupon codes</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Coupon Terms & Restrictions</h3>
              <p class="text-slate-600 mb-2">
                Understanding coupon terms helps ensure you can use them successfully:
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>Each coupon has an expiration date and must be used before it expires</li>
                <li>Coupons may have minimum purchase requirements</li>
                <li>Only one coupon can typically be used per order</li>
                <li>Coupons cannot be combined with certain other offers or promotions</li>
                <li>Some products or categories may be excluded from coupon discounts</li>
                <li>Coupons are non-transferable and cannot be sold or exchanged</li>
                <li>We reserve the right to modify or cancel coupon codes at any time</li>
                <li>Coupon codes are case-sensitive and must be entered exactly as provided</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Coupon Validation</h3>
              <p class="text-slate-600 mb-2">
                If your coupon code isn't working, here are common reasons and solutions:
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>Check that the coupon hasn't expired</li>
                <li>Verify you've entered the code correctly (check for typos)</li>
                <li>Ensure your order meets any minimum purchase requirements</li>
                <li>Confirm that the items in your cart are eligible for the coupon</li>
                <li>Check if the coupon has already been used (if single-use)</li>
                <li>Verify that you're logged into the correct account</li>
                <li>Contact customer service if the issue persists</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Rewards -->
        <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <Star class="w-6 h-6 text-red-600" />
            </div>
            <h2 class="text-2xl font-semibold text-slate-800">Rewards</h2>
          </div>
          <div class="space-y-6 text-slate-700">
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">BuyIt Rewards Program</h3>
              <p class="text-slate-600 mb-4">
                The BuyIt Rewards Program is our way of thanking you for being a valued customer.
                Earn points on every purchase and redeem them for discounts, free shipping, and
                exclusive perks. The more you shop, the more you save!
              </p>
              <p class="text-slate-600">
                Membership is free and automatic for all BuyIt customers. Start earning rewards from
                your very first purchase.
              </p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">How Rewards Work</h3>
              <p class="text-slate-600 mb-2">
                Earning and redeeming rewards is simple and straightforward:
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>
                  <strong>Earn Points:</strong> Earn 1 point for every $1 spent on eligible
                  purchases
                </li>
                <li>
                  <strong>Bonus Points:</strong> Earn extra points during special promotions and
                  events
                </li>
                <li>
                  <strong>Redeem Points:</strong> Use points to get discounts on future purchases
                </li>
                <li><strong>Point Value:</strong> 100 points = $1 in discount value</li>
                <li>
                  <strong>No Expiration:</strong> Points never expire as long as your account is
                  active
                </li>
                <li>
                  <strong>Automatic Enrollment:</strong> All customers are automatically enrolled
                  when they create an account
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Reward Tiers</h3>
              <p class="text-slate-600 mb-4">
                As you shop more, you'll advance through reward tiers with increasing benefits:
              </p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Bronze Member</h4>
                  <p class="text-sm text-slate-600 mb-2">Starting tier for all members</p>
                  <ul class="text-sm text-slate-600 space-y-1">
                    <li>• 1 point per $1 spent</li>
                    <li>• Standard shipping rates</li>
                    <li>• Access to member-only sales</li>
                  </ul>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Silver Member</h4>
                  <p class="text-sm text-slate-600 mb-2">Earned after $500 in purchases</p>
                  <ul class="text-sm text-slate-600 space-y-1">
                    <li>• 1.25 points per $1 spent</li>
                    <li>• Free shipping on orders $25+</li>
                    <li>• Early access to sales</li>
                    <li>• Birthday rewards</li>
                  </ul>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Gold Member</h4>
                  <p class="text-sm text-slate-600 mb-2">Earned after $1,500 in purchases</p>
                  <ul class="text-sm text-slate-600 space-y-1">
                    <li>• 1.5 points per $1 spent</li>
                    <li>• Free shipping on all orders</li>
                    <li>• Exclusive Gold member sales</li>
                    <li>• Priority customer support</li>
                    <li>• Special birthday rewards</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Ways to Earn Rewards</h3>
              <p class="text-slate-600 mb-2">
                There are multiple ways to earn reward points beyond just making purchases:
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li><strong>Purchases:</strong> Earn points on every eligible purchase you make</li>
                <li>
                  <strong>Product Reviews:</strong> Earn bonus points for writing helpful product
                  reviews
                </li>
                <li>
                  <strong>Referrals:</strong> Earn points when friends sign up using your referral
                  link
                </li>
                <li>
                  <strong>Social Sharing:</strong> Earn points for sharing products on social media
                </li>
                <li>
                  <strong>Birthday Bonus:</strong> Receive bonus points on your birthday (Silver and
                  Gold members)
                </li>
                <li>
                  <strong>Special Events:</strong> Earn extra points during promotional events and
                  sales
                </li>
                <li>
                  <strong>Account Milestones:</strong> Earn bonus points for reaching account
                  milestones
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Redeeming Rewards</h3>
              <p class="text-slate-600 mb-2">Using your reward points is easy and flexible:</p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>View your point balance in your account dashboard</li>
                <li>Redeem points at checkout for instant discounts</li>
                <li>Use any amount of points (minimum 100 points = $1)</li>
                <li>Combine points with other payment methods</li>
                <li>Points can be used for any product on BuyIt</li>
                <li>No expiration date on points as long as account is active</li>
                <li>Track your point history and redemptions in your account</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Rewards Program Terms</h3>
              <p class="text-slate-600 mb-2">
                Important information about the BuyIt Rewards Program:
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>Points are earned only on the final purchase amount after discounts</li>
                <li>Points cannot be earned on purchases paid for entirely with points</li>
                <li>Returns may result in points being deducted from your account</li>
                <li>Points are non-transferable and cannot be sold or exchanged</li>
                <li>Reward tiers are calculated based on lifetime purchase amount</li>
                <li>We reserve the right to modify the rewards program terms at any time</li>
                <li>Points have no cash value and cannot be redeemed for cash</li>
                <li>Account must be in good standing to earn and redeem points</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PageFooter />
  </div>
</template>

<style scoped></style>
