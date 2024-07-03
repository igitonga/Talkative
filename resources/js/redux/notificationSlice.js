import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

export const getNotifications = createAsyncThunk(
    'notifications/getNotifications',
    async (rejectWithValue) => {
        try {
            let response = await axios.get('api/get-notifications');

            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notificationsCount: 0,
        notificationsData: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNotifications.fulfilled, (state, action) => {
                state.notificationsCount = action.payload.count;
                state.notificationsData = action.payload.data;
            })
            .addCase(getNotifications.rejected, (state, action) => {
                toast.error(action.payload.message)
            })
    }
});

export const {} = notificationSlice.actions

export default notificationSlice.reducer