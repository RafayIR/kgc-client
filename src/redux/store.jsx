import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './Auth/loginSlice'
import vendorSlice from './Vendors/vendorSlice'
import signUpSlice from './registration/signUpSlice'
import billingSlice from './Vendors/billingSlice'
import pickupSlice from './Vendors/pickupSlice'
import modalSlice from './Modal/modalSlice'

export const store = configureStore({
  reducer: {
    login: loginSlice,
    signup: signUpSlice,
    vendor: vendorSlice,
    billing: billingSlice,
    pickup: pickupSlice,
    modal: modalSlice
  },
})