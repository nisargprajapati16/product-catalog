import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './feature/products/productsSlice'
import inventoryReducer from './feature/inventory/inventorySlice'
import orderReducer from './feature/order/orderSlice'


export default configureStore({
  reducer: {
    products: productsReducer,
    inventory: inventoryReducer,
    order: orderReducer
  },
})