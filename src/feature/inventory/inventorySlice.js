import { createSlice } from '@reduxjs/toolkit'
import data from "../../data/inventory.json"

export const productsSlice = createSlice({
  name: 'inventory',
  initialState: data
})

export default productsSlice.reducer