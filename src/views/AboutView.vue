<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue'
import PageFooter from '@/components/layout/PageFooter.vue'
import { Building2, Briefcase, Newspaper, MapPin, Users } from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-screen bg-(--light-pink) flex flex-col">
    <NavBar />
    <div class="flex-1 w-full flex justify-center py-10">
      <div class="w-[80%] max-w-6xl space-y-8">
        <h1 class="text-3xl font-bold text-slate-800 mb-8">About Us</h1>

        <!-- About Company -->
        <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Building2 class="w-6 h-6 text-blue-600" />
            </div>
            <h2 class="text-2xl font-semibold text-slate-800">About Company</h2>
          </div>
          <div class="space-y-6 text-slate-700">
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Our Story</h3>
              <p class="text-slate-600 mb-4">
                BuyIt was founded in 2020 with a simple mission: to make online shopping accessible,
                convenient, and enjoyable for everyone. What started as a small e-commerce platform
                has grown into one of the leading online marketplaces, connecting millions of
                customers with trusted sellers worldwide.
              </p>
              <p class="text-slate-600">
                We believe that shopping should be a seamless experience, whether you're looking for
                everyday essentials or unique products from around the globe. Our platform combines
                cutting-edge technology with exceptional customer service to deliver an unmatched
                shopping experience.
              </p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Our Mission</h3>
              <p class="text-slate-600 mb-2">
                To empower customers and sellers by creating a trusted, innovative, and inclusive
                marketplace that brings people together through commerce.
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>Provide exceptional value and quality products to our customers</li>
                <li>Support sellers in growing their businesses and reaching new markets</li>
                <li>Foster innovation in e-commerce technology and customer experience</li>
                <li>Build a sustainable and ethical business that benefits all stakeholders</li>
                <li>Create a diverse and inclusive community of shoppers and sellers</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Our Values</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Customer First</h4>
                  <p class="text-sm text-slate-600">
                    Every decision we make prioritizes our customers' needs and satisfaction
                  </p>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Integrity</h4>
                  <p class="text-sm text-slate-600">
                    We conduct business with honesty, transparency, and ethical practices
                  </p>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Innovation</h4>
                  <p class="text-sm text-slate-600">
                    We continuously improve our platform and services through innovation
                  </p>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Community</h4>
                  <p class="text-sm text-slate-600">
                    We build strong relationships with customers, sellers, and partners
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">What We Offer</h3>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>Wide selection of products across multiple categories</li>
                <li>Secure payment processing and buyer protection</li>
                <li>Fast and reliable shipping options</li>
                <li>24/7 customer support</li>
                <li>Easy returns and refunds</li>
                <li>Competitive prices and exclusive deals</li>
                <li>Seller marketplace for businesses of all sizes</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Careers -->
        <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Briefcase class="w-6 h-6 text-green-600" />
            </div>
            <h2 class="text-2xl font-semibold text-slate-800">Careers</h2>
          </div>
          <div class="space-y-6 text-slate-700">
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Join Our Team</h3>
              <p class="text-slate-600 mb-4">
                At BuyIt, we're always looking for talented, passionate individuals who share our
                vision of transforming the e-commerce experience. We offer exciting career
                opportunities in a dynamic, fast-paced environment where innovation and creativity
                are encouraged.
              </p>
              <p class="text-slate-600">
                Whether you're a developer, designer, marketer, or customer service professional, we
                have a place for you. Join us in building the future of online shopping.
              </p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Why Work at BuyIt?</h3>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>
                  <strong>Competitive Compensation:</strong> We offer competitive salaries and
                  comprehensive benefits packages
                </li>
                <li>
                  <strong>Growth Opportunities:</strong> Clear career paths and professional
                  development programs
                </li>
                <li>
                  <strong>Innovative Culture:</strong> Work with cutting-edge technology and
                  forward-thinking teams
                </li>
                <li>
                  <strong>Work-Life Balance:</strong> Flexible work arrangements and generous time
                  off policies
                </li>
                <li>
                  <strong>Diverse Team:</strong> Join a diverse, inclusive workplace where
                  everyone's voice matters
                </li>
                <li>
                  <strong>Impact:</strong> Make a real difference in how millions of people shop
                  online
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Open Positions</h3>
              <p class="text-slate-600 mb-4">
                We're currently hiring for positions across various departments. Explore our open
                roles and find the perfect fit for your skills and interests.
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Engineering & Technology</h4>
                  <ul class="text-sm text-slate-600 space-y-1">
                    <li>• Software Engineers</li>
                    <li>• Frontend Developers</li>
                    <li>• Backend Developers</li>
                    <li>• DevOps Engineers</li>
                    <li>• Data Scientists</li>
                  </ul>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Product & Design</h4>
                  <ul class="text-sm text-slate-600 space-y-1">
                    <li>• Product Managers</li>
                    <li>• UX/UI Designers</li>
                    <li>• Product Analysts</li>
                    <li>• Design Researchers</li>
                  </ul>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Marketing & Sales</h4>
                  <ul class="text-sm text-slate-600 space-y-1">
                    <li>• Marketing Managers</li>
                    <li>• Content Creators</li>
                    <li>• Sales Representatives</li>
                    <li>• Social Media Specialists</li>
                  </ul>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Operations & Support</h4>
                  <ul class="text-sm text-slate-600 space-y-1">
                    <li>• Customer Support</li>
                    <li>• Operations Managers</li>
                    <li>• Supply Chain Specialists</li>
                    <li>• Quality Assurance</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">How to Apply</h3>
              <ol class="list-decimal list-inside text-slate-600 space-y-1 ml-4">
                <li>Browse our open positions on our careers page</li>
                <li>Select a role that matches your skills and interests</li>
                <li>Submit your resume and cover letter through our application portal</li>
                <li>Our recruitment team will review your application</li>
                <li>If selected, you'll be invited for interviews</li>
                <li>Successful candidates will receive an offer and onboarding information</li>
              </ol>
              <p class="text-slate-600 mt-4">
                <strong>Contact:</strong> For general inquiries about careers, please email us at
                <a href="mailto:careers@buyit.com" class="text-blue-600 hover:underline"
                  >careers@buyit.com</a
                >
              </p>
            </div>
          </div>
        </div>

        <!-- Press & News -->
        <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <Newspaper class="w-6 h-6 text-orange-600" />
            </div>
            <h2 class="text-2xl font-semibold text-slate-800">Press & News</h2>
          </div>
          <div class="space-y-6 text-slate-700">
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Latest News</h3>
              <p class="text-slate-600 mb-4">
                Stay updated with the latest news, announcements, and developments from BuyIt. We're
                constantly evolving and improving our platform to serve you better.
              </p>
              <div class="space-y-4">
                <div class="bg-slate-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <div class="text-sm text-slate-500 mb-2">January 15, 2025</div>
                  <h4 class="font-semibold text-slate-800 mb-2">
                    BuyIt Launches New Mobile App with Enhanced Features
                  </h4>
                  <p class="text-sm text-slate-600">
                    We're excited to announce the launch of our redesigned mobile app, featuring
                    improved navigation, faster checkout, and personalized recommendations.
                  </p>
                </div>
                <div class="bg-slate-50 rounded-lg p-4 border-l-4 border-green-500">
                  <div class="text-sm text-slate-500 mb-2">December 20, 2024</div>
                  <h4 class="font-semibold text-slate-800 mb-2">
                    BuyIt Reaches 10 Million Active Users Milestone
                  </h4>
                  <p class="text-sm text-slate-600">
                    We're proud to announce that BuyIt has reached 10 million active users,
                    representing a significant milestone in our journey to transform online
                    shopping.
                  </p>
                </div>
                <div class="bg-slate-50 rounded-lg p-4 border-l-4 border-purple-500">
                  <div class="text-sm text-slate-500 mb-2">November 10, 2024</div>
                  <h4 class="font-semibold text-slate-800 mb-2">
                    New Sustainability Initiative: Carbon-Neutral Shipping
                  </h4>
                  <p class="text-sm text-slate-600">
                    BuyIt commits to carbon-neutral shipping for all orders, taking a significant
                    step toward environmental sustainability.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Press Releases</h3>
              <p class="text-slate-600 mb-4">
                Access our official press releases and media resources. For media inquiries, please
                contact our press team.
              </p>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>Company announcements and product launches</li>
                <li>Partnership and collaboration news</li>
                <li>Awards and recognition</li>
                <li>Financial updates and business milestones</li>
                <li>Corporate social responsibility initiatives</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Media Resources</h3>
              <p class="text-slate-600 mb-4">
                Journalists and media professionals can access our press kit, including company
                logos, executive bios, and high-resolution images.
              </p>
              <div class="bg-slate-50 rounded-lg p-6 space-y-3">
                <div class="flex items-start gap-3">
                  <strong class="text-slate-700 min-w-[120px]">Press Contact:</strong>
                  <div>
                    <p class="text-slate-600">press@buyit.com</p>
                    <p class="text-sm text-slate-500">For all media inquiries</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <strong class="text-slate-700 min-w-[120px]">Press Kit:</strong>
                  <div>
                    <p class="text-slate-600">
                      <a href="#" class="text-blue-600 hover:underline">Download Press Kit</a>
                    </p>
                    <p class="text-sm text-slate-500">
                      Includes logos, images, and company information
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <strong class="text-slate-700 min-w-[120px]">Response Time:</strong>
                  <div>
                    <p class="text-slate-600">Within 24 hours</p>
                    <p class="text-sm text-slate-500">
                      We aim to respond to all media inquiries promptly
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Store Locations -->
        <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <MapPin class="w-6 h-6 text-purple-600" />
            </div>
            <h2 class="text-2xl font-semibold text-slate-800">Store Locations</h2>
          </div>
          <div class="space-y-6 text-slate-700">
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Find Us Near You</h3>
              <p class="text-slate-600 mb-4">
                While BuyIt is primarily an online marketplace, we have physical locations and
                partner stores where you can experience our products and services in person. Visit
                us to see products up close, get expert advice, or pick up your online orders.
              </p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Our Locations</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">New York Flagship Store</h4>
                  <p class="text-sm text-slate-600 mb-2">
                    123 Commerce Street<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                  <p class="text-sm text-slate-600">
                    <strong>Hours:</strong> Mon-Sat 9AM-8PM, Sun 11AM-6PM<br />
                    <strong>Phone:</strong> (212) 555-0100
                  </p>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Los Angeles Showroom</h4>
                  <p class="text-sm text-slate-600 mb-2">
                    456 Market Boulevard<br />
                    Los Angeles, CA 90001<br />
                    United States
                  </p>
                  <p class="text-sm text-slate-600">
                    <strong>Hours:</strong> Mon-Sat 10AM-9PM, Sun 12PM-7PM<br />
                    <strong>Phone:</strong> (323) 555-0200
                  </p>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Chicago Experience Center</h4>
                  <p class="text-sm text-slate-600 mb-2">
                    789 Shopping Avenue<br />
                    Chicago, IL 60601<br />
                    United States
                  </p>
                  <p class="text-sm text-slate-600">
                    <strong>Hours:</strong> Mon-Sat 9AM-8PM, Sun 11AM-6PM<br />
                    <strong>Phone:</strong> (312) 555-0300
                  </p>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Miami Retail Store</h4>
                  <p class="text-sm text-slate-600 mb-2">
                    321 Ocean Drive<br />
                    Miami, FL 33139<br />
                    United States
                  </p>
                  <p class="text-sm text-slate-600">
                    <strong>Hours:</strong> Mon-Sat 10AM-9PM, Sun 12PM-8PM<br />
                    <strong>Phone:</strong> (305) 555-0400
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Services at Our Stores</h3>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>Product demonstrations and hands-on experience</li>
                <li>Expert advice from our knowledgeable staff</li>
                <li>Order pickup for online purchases</li>
                <li>Returns and exchanges</li>
                <li>Gift card purchases and redemption</li>
                <li>Special events and product launches</li>
                <li>Customer service support</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Partner Stores</h3>
              <p class="text-slate-600 mb-2">
                In addition to our flagship locations, BuyIt products are available at select
                partner stores nationwide. Visit our partner locations to browse a curated selection
                of our most popular products.
              </p>
              <p class="text-slate-600">
                For a complete list of partner stores in your area, please contact customer service
                or check our store locator tool.
              </p>
            </div>
          </div>
        </div>

        <!-- Affiliate Program -->
        <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <Users class="w-6 h-6 text-red-600" />
            </div>
            <h2 class="text-2xl font-semibold text-slate-800">Affiliate Program</h2>
          </div>
          <div class="space-y-6 text-slate-700">
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Earn with BuyIt</h3>
              <p class="text-slate-600 mb-4">
                Join the BuyIt Affiliate Program and earn commissions by promoting our products to
                your audience. Whether you're a blogger, influencer, content creator, or website
                owner, our affiliate program offers a great opportunity to monetize your platform
                while helping others discover amazing products.
              </p>
              <p class="text-slate-600">
                Our program is free to join, easy to use, and offers competitive commission rates.
                Start earning today by sharing BuyIt products with your followers and readers.
              </p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">How It Works</h3>
              <ol class="list-decimal list-inside text-slate-600 space-y-1 ml-4">
                <li>Sign up for the affiliate program (free and quick)</li>
                <li>Get your unique affiliate links and promotional materials</li>
                <li>Share BuyIt products with your audience using your links</li>
                <li>Earn commissions when customers make purchases through your links</li>
                <li>Track your performance and earnings through your affiliate dashboard</li>
                <li>Receive monthly payments for your commissions</li>
              </ol>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Benefits</h3>
              <ul class="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>
                  <strong>Competitive Commissions:</strong> Earn up to 10% commission on qualifying
                  sales
                </li>
                <li>
                  <strong>Cookie Duration:</strong> 30-day cookie window ensures you get credit for
                  sales
                </li>
                <li>
                  <strong>Real-Time Tracking:</strong> Monitor clicks, conversions, and earnings in
                  real-time
                </li>
                <li>
                  <strong>Marketing Materials:</strong> Access banners, product images, and
                  promotional content
                </li>
                <li>
                  <strong>Dedicated Support:</strong> Get help from our affiliate support team
                </li>
                <li>
                  <strong>Flexible Payments:</strong> Multiple payment options including PayPal and
                  bank transfer
                </li>
                <li><strong>No Minimums:</strong> No minimum sales requirement to get started</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Who Can Join?</h3>
              <p class="text-slate-600 mb-2">
                Our affiliate program is open to anyone with an online presence, including:
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Content Creators</h4>
                  <ul class="text-sm text-slate-600 space-y-1">
                    <li>• Bloggers and writers</li>
                    <li>• YouTubers and video creators</li>
                    <li>• Social media influencers</li>
                    <li>• Podcasters</li>
                  </ul>
                </div>
                <div class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-800 mb-2">Website Owners</h4>
                  <ul class="text-sm text-slate-600 space-y-1">
                    <li>• Review sites</li>
                    <li>• Comparison sites</li>
                    <li>• Niche websites</li>
                    <li>• Online communities</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-3">Get Started</h3>
              <p class="text-slate-600 mb-4">
                Ready to start earning? Join our affiliate program today and begin promoting BuyIt
                products to your audience.
              </p>
              <div class="bg-slate-50 rounded-lg p-6 space-y-3">
                <div class="flex items-start gap-3">
                  <strong class="text-slate-700 min-w-[120px]">Apply Now:</strong>
                  <div>
                    <p class="text-slate-600">
                      <a href="#" class="text-blue-600 hover:underline">Join Affiliate Program</a>
                    </p>
                    <p class="text-sm text-slate-500">Quick and easy signup process</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <strong class="text-slate-700 min-w-[120px]">Questions?</strong>
                  <div>
                    <p class="text-slate-600">
                      Email us at
                      <a href="mailto:affiliates@buyit.com" class="text-blue-600 hover:underline"
                        >affiliates@buyit.com</a
                      >
                    </p>
                    <p class="text-sm text-slate-500">Our affiliate team is here to help</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <strong class="text-slate-700 min-w-[120px]">Terms:</strong>
                  <div>
                    <p class="text-slate-600">
                      <a href="#" class="text-blue-600 hover:underline"
                        >View Affiliate Terms & Conditions</a
                      >
                    </p>
                    <p class="text-sm text-slate-500">Review our program policies and guidelines</p>
                  </div>
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
