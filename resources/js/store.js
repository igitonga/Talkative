import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/userSlice';
import chatReducer from './redux/chatSlice';
import notificationReducer from './redux/notificationSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    notification: notificationReducer,
  },
})