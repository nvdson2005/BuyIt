export enum UserInputMode {
  LOGIN,
  SIGNUP,
}

export enum SortOption {
  MOST_SOLD,
  MOST_RATED,
  SELLING_FASTEST,
  PRICE_LOW_TO_HIGH,
  PRICE_HIGH_TO_LOW,
}

export enum PriceFilterOption {
  ALL_PRICES = 'All prices',
  BELOW_5MIL = 'Below 5 million',
  FROM_5MIL_TO_20MIL = 'From 5 million to 20 million',
  ABOVE_20MIL = 'Above 20 million',
}

export enum ProfileOptions {
  PROFILE = 'Profile',
  BANK_CARDS = 'Bank & Cards',
  ADDRESSES = 'Addresses',
  CHANGE_PASSWORD = 'Change Password',
  NOTIFICATIONS = 'Notification Settings',
  PRIVACY_SETTINGS = 'Privacy Settings',
  PERSONAL_INFO = 'Personal Information',
}

export enum OrderFilterOptions {
  ALL = 'All',
  PENDING = 'Pending',
  DELIVERING = 'Delivering',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
  RETURN_REFUNDED = 'Return/Refunded',
}
