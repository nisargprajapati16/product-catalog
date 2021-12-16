import { createSlice } from '@reduxjs/toolkit'
import data from "../../data/products.json"

export const productsSlice = createSlice({
  name: 'products',
  initialState: data
})

export default productsSlice.reducer