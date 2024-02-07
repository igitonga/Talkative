import { configureStore } from '@reduxjs/toolkit'
import userReducer from './redux/userSlice'
import chatReducer from './redux/chatSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
  },
})