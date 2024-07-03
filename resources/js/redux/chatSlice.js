import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async (data, {rejectWithValue}) => {
        console.log(data)
        try{
            let response = await axios.post('api/send-message', {message: data.message});
            return response.data 
        }
        catch(error){
            return rejectWithValue(error.response.data)
        }
    }
)

export const friendRequest = createAsyncThunk(
    'chat/friendRequest',
    async (data, {rejectWithValue}) => {
        try{
            toast.loading('Sending request...', { toastId: 'friend-request' });
            let response = await axios.post('api/friend-request', {userId: data.userId});
            return response.data 
        }
        catch(error){
            return rejectWithValue(error.response.data)
        }
    }
)

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        requestsData: null,
    },
    reducers:{

    },
    extraReducers: (builder) => {
        builder
          .addCase(sendMessage.fulfilled, (state, action) => {
            if(action.payload.status === 200){
                
            }
          })
          .addCase(sendMessage.rejected, (state, action) => {
            toast.error(action.payload.message)
          })

          .addCase(friendRequest.fulfilled, (state, action) => {
            toast.update('friend-request',
            { render: action.payload.message, type: 'success', isLoading: false, autoClose: 5000, draggable: true, closeOnClick: true }
            )
          })
          .addCase(friendRequest.rejected, (state, action) => {
            toast.update('friend-request',
                { render: typeof action.payload.message === 'string' ? action.payload.message : 'Internal server error. Please try again later', type: 'error', isLoading: false, autoClose: 5000, draggable: true, closeOnClick: true }
            );
          })

    }
})

export const {} = chatSlice.actions

export default chatSlice.reducer