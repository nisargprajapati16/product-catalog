import { createSlice } from '@reduxjs/toolkit'

export const productsSlice = createSlice({
  name: 'order',
  initialState: [],
  reducers: {
    updateCart: (state, action) => {
      if (action.payload.quantity && state.findIndex(item => item.id === action.payload.id) > -1) {
        const item = state.find(item => item.id === action.payload.id)
        item.quantity = action.payload.quantity
      } else if (action.payload.quantity && state.findIndex(item => item.id === action.payload.id) === -1) {
        state = state.push({ quantity: action.payload.quantity, id: action.payload.id })
      } else {
        return state.filter(item => item.id !== action.payload.id)
      }
    }
  },
})

export const { updateCart } = productsSlice.actions

export default productsSlice.reducer