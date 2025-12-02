<script lang="ts" setup>
import NavBar from '@/components/layout/NavBar.vue'
import { User, Lock, MapPin, CreditCard, Users, Star, Ticket } from 'lucide-vue-next'
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import PasswordInput from '@/components/ui/PasswordInput.vue'
// Sidebar section options
type SidebarOption =
  | 'PROFILE'
  | 'CHANGE_PASSWORD'
  | 'ADDRESS'
  | 'PAYMENT'
  | 'FOLLOWING'
  | 'REVIEWS'
  | 'VOUCHERS'
import { type ProfileDetail } from '@/utils/interface' // Not used
import apiClient from '@/api/client'
import { AxiosError, type AxiosResponse } from 'axios'
import { notify, notifyAsync } from '@/utils/notify'
import { ToastifyContainer } from 'vue3-toastify'

// ROUTER
const router = useRouter()
// -------------- For password section -------------------------
const password = ref<string>('')
const retypePassword = ref<string>('')
const newPassword = ref<string>('')
const passwordError = ref<string>('')
const handlePasswordChange = async (e: Event) => {
  e.preventDefault()
  if (newPassword.value !== retypePassword.value) {
    passwordError.value = 'New passwords do not match.'
    notify('New passwords do not match.', 'error')
    return
  }
  try {
    const response: AxiosResponse = await notifyAsync(
      apiClient.put('/change-password', {
        oldPassword: password.value,
        newPassword: newPassword.value,
      }),
    )
    console.log('Password changed successfully:', response)
    passwordError.value = ''
    notify('Password changed successfully!', 'success')
    // Reset the password fields
    password.value = ''
    newPassword.value = ''
    retypePassword.value = ''
  } catch (error) {
    console.error('Error changing password:', error)
    if (error instanceof AxiosError) {
      if (error.response) {
        passwordError.value =
          'Failed to change password: ' + (error.response.data.message || 'Unknown error')
        notify(passwordError.value, 'error')
      } else if (error.request) {
        passwordError.value = 'Failed to change password: No response from server'
        notify(passwordError.value, 'error')
      } else {
        passwordError.value = 'Failed to change password: ' + error.message
        notify(passwordError.value, 'error')
      }
    } else if (error instanceof Error) {
      passwordError.value = 'Failed to change password: ' + error.message
      notify(passwordError.value, 'error')
    }
  }
}

//
const chosenSidebarOption = ref<SidebarOption>('PROFILE')
const profile = ref<ProfileDetail | null>(null)
const editedProfile = ref<ProfileDetail>({
  username: '',
  name: '',
  email: '',
  phone: '',
  description: '',
})

onMounted(async () => {
  // Placeholder for fetching profile info
  const result: AxiosResponse = await apiClient.get('/user/profile')
  const raw = result.data.user
  profile.value = {
    username: raw.username ?? '',
    name: raw.name ?? '',
    email: raw.email ?? '',
    phone: raw.phone_number ?? '',
    description: raw.description ?? '',
  }
  editedProfile.value = { ...profile.value }
})
const isEditingProfile = ref(false)

const changeMode = (isEditing: boolean) => {
  if (isEditing) {
    if (profile.value) {
      editedProfile.value = { ...profile.value }
      isEditingProfile.value = true
    }
  } else {
    isEditingProfile.value = false
    editedProfile.value = { ...profile.value! }
  }
}
const handleSubmit = async (e: Event) => {
  e.preventDefault()
  try {
    const response = await notifyAsync(
      apiClient.put('/user/profile', {
        username: editedProfile.value?.username,
        name: editedProfile.value?.name,
        email: editedProfile.value?.email,
        phone_number: editedProfile.value?.phone,
        description: editedProfile.value?.description,
      }),
    )
    if (response.status === 200) {
      console.log('Profile updated successfully')
      profile.value = { ...editedProfile.value! }
      isEditingProfile.value = false
      notify('Profile updated successfully!', 'success')
    } else {
      console.error('Failed to update profile')
      notify('Failed to update profile', 'error')
    }
  } catch (error) {
    console.error('Error updating profile:', error)
    if (error instanceof AxiosError) {
      if (error.response) {
        notify(
          'Failed to update profile: ' + (error.response.data.message || 'Unknown error'),
          'error',
        )
      } else if (error.request) {
        notify('Failed to update profile: No response from server', 'error')
      } else {
        notify('Failed to update profile: ' + error.message, 'error')
      }
    } else if (error instanceof Error) {
      notify('Failed to update profile: ' + error.message, 'error')
    }
  }
}

// ---------------- For Address Section -------------------
const deleteAddress = async (addressId: string) => {
  try {
    const response: AxiosResponse = await notifyAsync(
      apiClient.delete(`/user/address/${addressId}`),
    )
    if (response.status === 200) {
      notify('Address deleted successfully!', 'success')
      fetchAddresses()
    }
  } catch (error) {
    console.error('Error deleting address:', error)
    if (error instanceof AxiosError) {
      notify('Failed to delete address: ' + error.message, 'error')
    } else if (error instanceof Error) {
      notify('Failed to delete address: ' + error.message, 'error')
    }
  }
}
import { Pin, Pencil, Trash } from 'lucide-vue-next'
interface Address {
  address_id: string
  full_name: string
  street: string
  ward: string
  district: string
  city: string
  state: string
  phone_number: string
  is_default: boolean
}
const addressList = ref<Address[]>([])
const fetchAddresses = async () => {
  try {
    const response: AxiosResponse = await apiClient.get('/user/addresses')
    if (Object.prototype.hasOwnProperty.call(response.data, 'addresses')) {
      addressList.value = response.data.addresses
      addressList.value.sort((a, b) => (a.is_default === b.is_default ? 0 : a.is_default ? -1 : 1))
    }
    // Handle the response as needed
    console.log('Fetched addresses:', response)
  } catch (error) {
    console.error('Error fetching addresses:', error)
  }
}

const showAddressModal = ref(false)
const isEditingAddress = ref(false)
const editingAddressId = ref<string | null>(null)
const addressForm = ref<Omit<Address, 'address_id' | 'is_default'>>({
  full_name: '',
  street: '',
  ward: '',
  district: '',
  city: '',
  state: '',
  phone_number: '',
})
const openAddAddressModal = () => {
  isEditingAddress.value = false
  editingAddressId.value = null
  addressForm.value = {
    full_name: '',
    street: '',
    ward: '',
    district: '',
    city: '',
    state: '',
    phone_number: '',
  }
  showAddressModal.value = true
}
const openEditAddressModal = (address: Address) => {
  isEditingAddress.value = true
  editingAddressId.value = address.address_id
  addressForm.value = {
    full_name: address.full_name,
    street: address.street,
    ward: address.ward,
    district: address.district,
    city: address.city,
    state: address.state,
    phone_number: address.phone_number,
  }
  showAddressModal.value = true
}
const submitAddressForm = async () => {
  if (isEditingAddress.value && editingAddressId.value !== null) {
    // Edit mode
    try {
      const response: AxiosResponse = await notifyAsync(
        apiClient.put(`/user/address/${editingAddressId.value}`, {
          ...addressForm.value,
        }),
      )
      if (response.status === 200) {
        fetchAddresses()
        notify('Address updated successfully!', 'success')
        // const idx = addressList.value.findIndex((a) => a.address_id === editingAddressId.value)
        // if (idx !== -1) {
        //   addressList.value[idx] = {
        //     address_id: editingAddressId.value,
        //     ...addressForm.value,
        //     is_default: addressList.value[idx]?.is_default ?? false,
        //   }
        // }
      }
    } catch (error) {
      console.error('Error editing address:', error)
      if (error instanceof AxiosError) {
        if (error.response) {
          notify(
            'Failed to update address: ' + (error.response.data.message || 'Unknown error'),
            'error',
          )
        } else if (error.request) {
          notify('Failed to update address: No response from server', 'error')
        } else {
          notify('Failed to update address: ' + error.message, 'error')
        }
      } else if (error instanceof Error) {
        notify('Failed to update address: ' + error.message, 'error')
      }
    }
  } else {
    // Add mode
    try {
      const response: AxiosResponse = await notifyAsync(
        apiClient.post('/user/address', {
          ...addressForm.value,
        }),
      )
      if (response.status === 201) {
        addressList.value.push({
          address_id: response.data.id,
          ...addressForm.value,
          is_default: false,
        })
        notify('Address added successfully!', 'success')
      }
    } catch (error) {
      console.error('Error adding new address:', error)
      if (error instanceof AxiosError) {
        if (error.response) {
          notify(
            'Failed to add address: ' + (error.response.data.message || 'Unknown error'),
            'error',
          )
        } else if (error.request) {
          notify('Failed to add address: No response from server', 'error')
        } else {
          notify('Failed to add address: ' + error.message, 'error')
        }
      } else if (error instanceof Error) {
        notify('Failed to add address: ' + error.message, 'error')
      }
    }
  }
  showAddressModal.value = false
  isEditingAddress.value = false
  editingAddressId.value = null
  addressForm.value = {
    full_name: '',
    street: '',
    ward: '',
    district: '',
    city: '',
    state: '',
    phone_number: '',
  }
}

const setDefaultAddress = async (addressId: string) => {
  try {
    const response: AxiosResponse = await notifyAsync(
      apiClient.put(`/user/set-default-address/${addressId}`),
    )
    if (response.status === 200) {
      addressList.value = addressList.value.map((address) => ({
        ...address,
        is_default: address.address_id === addressId ? true : false,
      }))
      notify('Default address updated successfully!', 'success')
    }
  } catch (error) {
    console.error('Error setting default address:', error)
    if (error instanceof AxiosError) {
      if (error.response) {
        notify(
          'Failed to set default address: ' + (error.response.data.message || 'Unknown error'),
          'error',
        )
      } else if (error.request) {
        notify('Failed to set default address: No response from server', 'error')
      } else {
        notify('Failed to set default address: ' + error.message, 'error')
      }
    } else if (error instanceof Error) {
      notify('Failed to set default address: ' + error.message, 'error')
    }
  }
}

// ---------------- Payment Section -------------------
interface PaymentOption {
  name: string
  method_id: string
  option_id: string
  description: string
  account_number?: string
  expiry_date?: string
  is_default: boolean
  is_enabled: boolean
}
interface AvailablePaymentMethod {
  option_id: string
  name: string
  description: string
}
const availablePaymentMethods = ref<AvailablePaymentMethod[]>([])
const paymentOptions = ref<PaymentOption[]>([])
const showPaymentModal = ref(false)
// newPayment.type is a string key from availablePaymentMethods (e.g. 'ONLINE', 'BANK_X')
const newPayment = ref<{
  type: string
  account_number: string
  expiry_date: Date | null
}>({
  type: 'ONLINE',
  account_number: '',
  expiry_date: null,
})
const addNewPayment = async () => {
  try {
    const optionId = availablePaymentMethods.value.find(
      (option) => option.name === newPayment.value.type,
    )?.option_id
    const response: AxiosResponse = await notifyAsync(
      apiClient.post('/buyer/payment', {
        optionId,
        accountNumber: newPayment.value.account_number,
        expiryDate: newPayment.value.expiry_date,
        isDefault: false,
      }),
    )
    if (response.status === 201) {
      console.log('Added new payment method:', response)
      notify('Payment method added successfully!', 'success')
      // Optionally refresh the payment methods list
      fetchPayments()
      showPaymentModal.value = false
    }
  } catch (error) {
    console.error('Error adding new payment method:', error)
    if (error instanceof AxiosError) {
      if (error.response) {
        notify(
          'Failed to add payment method: ' + (error.response.data.message || 'Unknown error'),
          'error',
        )
      } else if (error.request) {
        notify('Failed to add payment method: No response from server', 'error')
      } else {
        notify('Failed to add payment method: ' + error.message, 'error')
      }
    } else if (error instanceof Error) {
      notify('Failed to add payment method: ' + error.message, 'error')
    }
  }
}
const deletePayment = async (method_id: string) => {
  try {
    const response: AxiosResponse = await notifyAsync(
      apiClient.delete(`/buyer/payment/${method_id}`),
    )
    if (response.status === 200) {
      console.log('Deleted payment method:', response)
      notify('Payment method deleted successfully!', 'success')
      // Refresh the payment methods list
      fetchPayments()
    }
  } catch (error) {
    console.error('Error deleting payment method:', error)
    if (error instanceof AxiosError) {
      if (error.response) {
        notify(
          'Failed to delete payment method: ' + (error.response.data.message || 'Unknown error'),
          'error',
        )
      } else if (error.request) {
        notify('Failed to delete payment method: No response from server', 'error')
      } else {
        notify('Failed to delete payment method: ' + error.message, 'error')
      }
    } else if (error instanceof Error) {
      notify('Failed to delete payment method: ' + error.message, 'error')
    }
  }
}
const fetchPayments = async () => {
  const response = await apiClient.get('/buyer/payments')
  // Handle response
  if (Object.prototype.hasOwnProperty.call(response.data, 'payments')) {
    console.log('Fetched payments:', response)
    paymentOptions.value = response.data.payments
    console.log(paymentOptions.value)
  }
}
const fetchAvailablePaymentMethods = async () => {
  const response = await apiClient.get('/buyer/payment-options')
  // Handle response
  if (Object.prototype.hasOwnProperty.call(response.data, 'options')) {
    console.log('Fetched available payment methods:', response)
    availablePaymentMethods.value = response.data.options
  }
}

// ---------------- Following Section -------------------
interface Shop {
  id: string
  name: string
  description: string
  followers: number
  rating: number
}
const followedShops = ref<Shop[]>([])

const goToShop = (shopId: string) => {
  router.push({ name: 'ShopView', params: { shopId } })
}
const fetchFollowedShops = async () => {
  try {
    const response: AxiosResponse = await apiClient.get('/buyer/followed-shops')
    if (Object.prototype.hasOwnProperty.call(response.data, 'shops')) {
      followedShops.value = response.data.shops
    }
    // console.log('Fetched followed shops:', response)
    followedShops.value = response.data.shops
    // console.log(followedShops.value)
  } catch (error) {
    console.error('Error fetching followed shops:', error)
  }
}

// ============= REVIEWS Section ==============
interface Review {
  review_id: string
  product_id: string
  product_variant_id: string
  rating: number
  comment: string | null
  created_at: string
  updated_at: string
  buyer_id: string
}
const reviewsList = ref<Review[]>([])
const fetchReviews = async () => {
  try {
    const response: AxiosResponse = await apiClient.get('/buyer/reviews')
    if (Object.prototype.hasOwnProperty.call(response.data, 'reviews')) {
      reviewsList.value = response.data.reviews
    }
  } catch (error) {
    console.error('Error fetching reviews:', error)
  }
}
const formatDate = (iso: string) => {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}
const goToProduct = (productId: string) => {
  router.push({ name: 'ProductView', params: { productId } })
}

// ============ Fetch Data based on sidebar option =====================
watch(chosenSidebarOption, (newOption) => {
  if (newOption == 'ADDRESS') {
    showAddressModal.value = false
    console.log('Fetching addresses...')
    fetchAddresses()
  } else if (newOption == 'PAYMENT') {
    console.log('Fetching payment options...')
    fetchPayments()
    fetchAvailablePaymentMethods()
  } else if (newOption == 'FOLLOWING') {
    // Fetch followed shops if needed
    console.log('Viewing followed shops...')
    fetchFollowedShops()
  } else if (newOption == 'REVIEWS') {
    console.log('Fetching reviews...')
    fetchReviews()
  }
})
</script>
<template>
  <ToastifyContainer />
  <NavBar />
  <div class="min-h-screen bg-(--light-pink) flex justify-center py-10">
    <div class="flex gap-8 w-full max-w-4/5">
      <!-- Sidebar -->
      <aside class="flex-1 bg-white rounded-xl shadow p-6 flex flex-col gap-4">
        <div class="flex items-center gap-4 pb-4 border-b">
          <div
            class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-4xl"
          >
            <User class="w-10 h-10" />
          </div>
          <div class="flex flex-col">
            <div class="font-semibold text-lg">{{ profile?.name }}</div>
            <div class="text-xs text-slate-500 flex items-center gap-1 cursor-pointer">
              Edit profile
            </div>
          </div>
        </div>
        <nav class="flex-1 pt-2">
          <ul class="flex flex-col gap-1 text-[15px]">
            <li
              class="flex items-center gap-2 px-2 py-2 font-semibold cursor-pointer hover:bg-rose-50 rounded"
              :class="{ 'text-(--red)': chosenSidebarOption === 'PROFILE' }"
              @click="chosenSidebarOption = 'PROFILE'"
            >
              <User class="w-5 h-5" />
              Profile
            </li>
            <li
              class="flex items-center gap-2 px-2 py-2 font-semibold cursor-pointer hover:bg-rose-50 rounded"
              :class="{ 'text-(--red)': chosenSidebarOption === 'CHANGE_PASSWORD' }"
              @click="chosenSidebarOption = 'CHANGE_PASSWORD'"
            >
              <Lock class="w-5 h-5" />
              Change Password
            </li>
            <li
              class="flex items-center gap-2 px-2 py-2 font-semibold cursor-pointer hover:bg-rose-50 rounded"
              :class="{ 'text-(--red)': chosenSidebarOption === 'ADDRESS' }"
              @click="chosenSidebarOption = 'ADDRESS'"
            >
              <MapPin class="w-5 h-5" />
              Address
            </li>
            <li
              class="flex items-center gap-2 px-2 py-2 font-semibold cursor-pointer hover:bg-rose-50 rounded"
              :class="{ 'text-(--red)': chosenSidebarOption === 'PAYMENT' }"
              @click="chosenSidebarOption = 'PAYMENT'"
            >
              <CreditCard class="w-5 h-5" />
              Payment
            </li>
            <li
              class="flex items-center gap-2 px-2 py-2 font-semibold cursor-pointer hover:bg-rose-50 rounded"
              :class="{ 'text-(--red)': chosenSidebarOption === 'FOLLOWING' }"
              @click="chosenSidebarOption = 'FOLLOWING'"
            >
              <Users class="w-5 h-5" />
              Following
            </li>
            <li
              class="flex items-center gap-2 px-2 py-2 font-semibold cursor-pointer hover:bg-rose-50 rounded"
              :class="{ 'text-(--red)': chosenSidebarOption === 'REVIEWS' }"
              @click="chosenSidebarOption = 'REVIEWS'"
            >
              <Star class="w-5 h-5" />
              Reviews
            </li>
            <li
              class="flex items-center gap-2 px-2 py-2 font-semibold cursor-pointer hover:bg-rose-50 rounded"
              :class="{ 'text-(--red)': chosenSidebarOption === 'VOUCHERS' }"
              @click="chosenSidebarOption = 'VOUCHERS'"
            >
              <Ticket class="w-5 h-5" />
              Vouchers
            </li>
          </ul>
        </nav>
      </aside>

      <!-- Main profile content -->
      <section class="flex-3 bg-white rounded-xl shadow p-8 flex flex-col gap-6">
        <div v-if="chosenSidebarOption === 'PROFILE'">
          <div class="flex items-center justify-between border-b pb-4">
            <div>
              <h2 class="text-xl font-semibold text-slate-800">My Profile</h2>
              <p class="text-sm text-slate-500 mt-1">
                Manage your profile information to secure your account
              </p>
            </div>
          </div>
          <div class="flex gap-8">
            <!-- Profile form -->
            <form class="flex-1 flex flex-col gap-4" @submit="handleSubmit">
              <div class="flex items-center gap-4">
                <label class="w-40 text-slate-600 font-medium">Username</label>
                <input
                  type="text"
                  :disabled="!isEditingProfile"
                  class="text-slate-800 font-semibold"
                  :class="
                    isEditingProfile
                      ? 'p-2 input-box w-80 bg-slate-50'
                      : 'p-2 bg-transparent border-0 w-80 focus:ring-0 focus:outline-none'
                  "
                  v-model="editedProfile.username"
                />
              </div>
              <div class="flex items-center gap-4">
                <label class="w-40 text-slate-600 font-medium">Name</label>
                <input
                  type="text"
                  :disabled="!isEditingProfile"
                  :class="
                    isEditingProfile
                      ? 'p-2 input-box w-80 bg-slate-50'
                      : 'p-2 bg-transparent border-0 w-80 focus:ring-0 focus:outline-none'
                  "
                  v-model="editedProfile.name"
                />
              </div>
              <div class="flex items-center gap-4">
                <label class="w-40 text-slate-600 font-medium">Email</label>
                <input
                  type="email"
                  :disabled="!isEditingProfile"
                  :class="
                    isEditingProfile
                      ? 'p-2 input-box w-80 bg-slate-50'
                      : 'p-2 bg-transparent border-0 w-80 focus:ring-0 focus:outline-none'
                  "
                  v-model="editedProfile.email"
                />
              </div>
              <div class="flex items-center gap-4">
                <label class="w-40 text-slate-600 font-medium">Phone number</label>
                <input
                  type="text"
                  :disabled="!isEditingProfile"
                  :class="
                    isEditingProfile
                      ? 'p-2 input-box w-80 bg-slate-50'
                      : 'p-2 bg-transparent border-0 w-80 focus:ring-0 focus:outline-none'
                  "
                  v-model="editedProfile.phone"
                />
              </div>
              <div class="flex flex-col gap-4">
                <label class="w-40 text-slate-600 font-medium">Description</label>
                <textarea
                  rows="4"
                  class="input-box w-full resize-none bg-slate-50"
                  placeholder="Tell us about yourself"
                  :disabled="!isEditingProfile"
                  v-model="editedProfile.description"
                >
                </textarea>
              </div>
              <div class="flex items-center gap-4 mt-2">
                <button
                  type="button"
                  :class="
                    isEditingProfile
                      ? 'border px-6 py-2 rounded font-medium text-slate-700 hover:bg-gray-50'
                      : 'bg-(--red) text-white px-6 py-2 rounded font-medium hover:bg-red-600'
                  "
                  @click="
                    () => {
                      changeMode(isEditingProfile ? false : true)
                    }
                  "
                >
                  {{ isEditingProfile ? 'Cancel' : 'Edit Profile' }}
                </button>
                <button
                  type="submit"
                  class="bg-(--red) text-white px-6 py-2 rounded font-medium hover:bg-red-600"
                  v-if="isEditingProfile"
                >
                  Save Changes
                </button>
              </div>
            </form>
            <!-- Avatar section -->
            <div class="w-80 flex flex-col items-center border-l pl-8">
              <div
                class="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-6xl mb-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-28 h-28"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <button
                class="border px-6 py-2 rounded font-medium text-slate-700 hover:bg-gray-50 mb-2"
              >
                Change Avatar
              </button>
            </div>
          </div>
        </div>
        <!-- Change Password Section -->
        <div v-else-if="chosenSidebarOption === 'CHANGE_PASSWORD'">
          <h2 class="text-xl font-semibold text-slate-800 mb-4 w-full">Change Password</h2>
          <form class="flex flex-col gap-4 w-full" v-on:submit="handlePasswordChange">
            <div class="flex flex-col w-full">
              <div class="flex items-center gap-4">
                <label class="text-slate-500 flex-2">Current Password</label>
                <PasswordInput v-model="password" class="flex-8" />
              </div>
              <div class="flex items-center gap-4">
                <label class="text-slate-500 flex-2">New Password</label>
                <PasswordInput v-model="newPassword" class="flex-8" />
              </div>
              <div class="flex items-center gap-4">
                <label class="text-slate-500 flex-2">Retype New Password</label>
                <PasswordInput v-model="retypePassword" class="flex-8" />
              </div>
            </div>
            <div v-if="passwordError" class="text-red-500 mt-2">{{ passwordError }}</div>
            <div class="flex gap-4 items-center">
              <button
                class="bg-slate-500 text-white px-6 py-2 rounded font-medium hover:bg-slate-600 mt-4 w-fit"
                @click="
                  (e) => {
                    e.preventDefault()
                    password = ''
                    newPassword = ''
                    retypePassword = ''
                    passwordError = ''
                  }
                "
              >
                Clear
              </button>
              <button
                type="submit"
                class="bg-(--red) text-white px-6 py-2 rounded font-medium hover:bg-red-600 mt-4 w-fit"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>

        <!-- Address Section -->
        <div v-else-if="chosenSidebarOption === 'ADDRESS'">
          <h2 class="text-xl font-semibold text-slate-800 mb-4">Address</h2>
          <div v-if="addressList.length === 0" class="text-slate-500 mb-4">No saved addresses</div>
          <div v-if="addressList.length > 0" class="text-slate-500 mb-4">Your saved addresses</div>
          <div v-if="addressList.length > 0" class="flex flex-col gap-3">
            <div
              v-for="address in addressList"
              :key="address.address_id"
              class="border p-4 rounded flex items-center gap-4 relative"
              :class="address.is_default ? 'border-blue-500 bg-blue-50' : ''"
            >
              <div class="flex-4">
                <div class="font-semibold">{{ address.full_name }}</div>
                <div class="text-sm text-slate-600">
                  {{ address.street }}, {{ address.ward }}, {{ address.district }},
                  {{ address.city }}, {{ address.state }}
                </div>
                <div class="text-sm text-slate-500">Phone: {{ address.phone_number }}</div>
              </div>
              <div class="flex-1 flex flex-col gap-2">
                <button
                  class="w-full border px-4 py-1 rounded font-medium text-slate-700 hover:bg-gray-50"
                  @click="openEditAddressModal(address)"
                >
                  <Pencil class="inline mr-1 w-4 h-4" /> Edit
                </button>
                <button
                  class="w-full border px-4 py-1 rounded font-medium text-slate-700 hover:bg-gray-50"
                  @click="deleteAddress(address.address_id)"
                >
                  <Trash class="inline mr-1 w-4 h-4" /> Delete
                </button>
                <button
                  v-if="!address.is_default"
                  class="w-full border px-4 py-1 rounded font-medium text-slate-700 hover:bg-gray-50"
                  @click="setDefaultAddress(address.address_id)"
                >
                  <Pin class="inline mr-1 w-4 h-4" /> Set as Default
                </button>
              </div>
            </div>
          </div>
          <button
            class="border px-6 py-2 rounded font-medium text-slate-700 hover:bg-gray-50 mt-4 w-fit"
            @click="openAddAddressModal"
          >
            Add New Address
          </button>

          <!-- Modal for add/edit address -->
          <div
            v-if="showAddressModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          >
            <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
              <button
                class="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                @click="showAddressModal = false"
              >
                &times;
              </button>
              <h3 class="text-lg font-semibold mb-4">
                {{ isEditingAddress ? 'Edit Address' : 'Add New Address' }}
              </h3>
              <form @submit.prevent="submitAddressForm" class="flex flex-col gap-3">
                <input
                  v-model="addressForm.full_name"
                  class="input-box p-2 rounded border"
                  placeholder="Full Name"
                  required
                />
                <input
                  v-model="addressForm.street"
                  class="input-box p-2 rounded border"
                  placeholder="Street"
                  required
                />
                <input
                  v-model="addressForm.ward"
                  class="input-box p-2 rounded border"
                  placeholder="Ward"
                  required
                />
                <input
                  v-model="addressForm.district"
                  class="input-box p-2 rounded border"
                  placeholder="District"
                  required
                />
                <input
                  v-model="addressForm.city"
                  class="input-box p-2 rounded border"
                  placeholder="City"
                  required
                />
                <input
                  v-model="addressForm.state"
                  class="input-box p-2 rounded border"
                  placeholder="State"
                  required
                />
                <input
                  v-model="addressForm.phone_number"
                  class="input-box p-2 rounded border"
                  placeholder="Phone Number"
                  required
                />
                <button
                  type="submit"
                  class="bg-blue-600 text-white px-4 py-2 rounded font-medium mt-2 hover:bg-blue-700"
                >
                  {{ isEditingAddress ? 'Save Changes' : 'Save Address' }}
                </button>
              </form>
            </div>
          </div>
        </div>

        <!-- Payment Section -->
        <div v-else-if="chosenSidebarOption === 'PAYMENT'">
          <h2 class="text-xl font-semibold text-slate-800 mb-4">Payment</h2>
          <div class="mb-4">
            <div v-if="paymentOptions.length === 0" class="text-slate-500">
              No payment methods added yet.
            </div>
            <div v-else class="flex flex-col gap-3">
              <div
                v-for="option in paymentOptions"
                :key="option.method_id"
                class="border p-4 rounded flex items-center gap-4 relative"
                :class="
                  option.name === 'Cash On Delivery'
                    ? 'border-green-500 bg-green-50'
                    : 'border-blue-500 bg-blue-50'
                "
              >
                <div class="flex-1 flex">
                  <div>
                    <div class="font-semibold">
                      <!-- {{ option=== 'COD' ? 'Cash on Delivery (COD)' : 'Online Banking' }} -->
                      {{ option.name }}
                    </div>
                    <div v-if="option.name !== 'Cash On Delivery'" class="text-sm text-slate-600">
                      Account Number: {{ option.account_number }}<br />
                      Expiry Date: {{ new Date(option.expiry_date ?? '').toDateString() }}
                    </div>
                  </div>
                  <div>
                    <Trash
                      class="absolute top-4 right-4 w-5 h-5 text-red-500 cursor-pointer"
                      @click="deletePayment(option.method_id)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            class="border px-6 py-2 rounded font-medium text-slate-700 hover:bg-gray-50 mt-4 w-fit"
            @click="showPaymentModal = true"
          >
            Add New Payment Option
          </button>

          <!-- Modal for adding new payment option -->
          <div
            v-if="showPaymentModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          >
            <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
              <button
                class="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                @click="showPaymentModal = false"
              >
                &times;
              </button>
              <h3 class="text-lg font-semibold mb-4">Add New Payment Option</h3>
              <form @submit.prevent="addNewPayment" class="flex flex-col gap-3">
                <label class="font-medium">Payment Type</label>
                <select v-model="newPayment.type" class="input-box p-2 rounded border">
                  <option
                    v-for="option in availablePaymentMethods"
                    :key="availablePaymentMethods.indexOf(option)"
                    :value="option.name"
                  >
                    {{ option.description }}
                  </option>
                </select>
                <div class="flex flex-col gap-2">
                  <input
                    v-model="newPayment.account_number"
                    class="input-box p-2 rounded border"
                    placeholder="Account Number"
                    required
                  />
                  <input
                    v-model="newPayment.expiry_date"
                    class="input-box p-2 rounded border"
                    placeholder="Expiry Date (MM/YY)"
                    type="date"
                    required
                    v-on:change="console.log(newPayment.expiry_date)"
                  />
                </div>
                <button
                  type="submit"
                  class="bg-blue-600 text-white px-4 py-2 rounded font-medium mt-2 hover:bg-blue-700"
                >
                  Save Payment Option
                </button>
              </form>
            </div>
          </div>
        </div>

        <!-- Following Section -->
        <div v-else-if="chosenSidebarOption === 'FOLLOWING'">
          <h2 class="text-xl font-semibold text-slate-800 mb-4">Following</h2>
          <div v-if="followedShops.length === 0" class="text-slate-500">
            You are not following any shops yet.
          </div>
          <div v-else class="flex flex-col gap-4">
            <div
              v-for="shop in followedShops"
              :key="shop.id"
              class="border rounded p-4 flex flex-col gap-1 bg-slate-50 cursor-pointer"
              @click="goToShop(shop.id)"
            >
              <div class="flex items-center justify-between">
                <div class="font-semibold text-lg">{{ shop.name }}</div>
                <div class="flex items-center gap-4 text-sm">
                  <span class="text-slate-500">Followers: {{ shop.followers }}</span>
                  <span class="text-yellow-500">★ {{ shop.rating }}</span>
                </div>
              </div>
              <div class="text-slate-600 text-sm mt-1">{{ shop.description }}</div>
            </div>
          </div>
        </div>

        <!-- Reviews Section -->
        <div v-else-if="chosenSidebarOption === 'REVIEWS'">
          <h2 class="text-xl font-semibold text-slate-800 mb-4">My Reviews</h2>
          <div v-if="reviewsList.length === 0" class="text-slate-500">
            You haven't posted any reviews yet.
          </div>
          <div v-else class="flex flex-col gap-4">
            <div
              v-for="review in reviewsList"
              :key="review.review_id"
              class="border rounded p-4 bg-slate-50 flex flex-col gap-2 cursor-pointer"
              @click="goToProduct(review.product_id)"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-1">
                  <Star
                    v-for="n in 5"
                    :key="n"
                    class="w-5 h-5"
                    :class="
                      n <= Math.round(review.rating)
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300'
                    "
                  />
                  <span class="ml-2 text-sm font-medium text-slate-600">{{
                    review.rating.toFixed(1)
                  }}</span>
                </div>
                <span class="text-xs text-slate-500">{{ formatDate(review.created_at) }}</span>
              </div>
              <div v-if="review.comment" class="text-sm text-slate-700">{{ review.comment }}</div>
              <div class="text-xs text-slate-400 flex gap-4 flex-wrap">
                <span>Product: {{ review.product_id.slice(0, 8) }}…</span>
                <span>Variant: {{ review.product_variant_id.slice(0, 8) }}…</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Vouchers Section -->
        <div v-else-if="chosenSidebarOption === 'VOUCHERS'">
          <h2 class="text-xl font-semibold text-slate-800 mb-4">Vouchers</h2>
          <div class="text-slate-500">You don't have any vouchers yet.</div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped></style>
