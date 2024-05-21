import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

export const requestsCount = createAsyncThunk(
    'chat/requestsCount',
    async () => {
        return await axios.get('api/get-requests-count');
    }
)

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

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        requestsData: null,
    },
    reducers:{

    },
    extraReducers: (builder) => {
        builder
        .addCase(requestsCount.fulfilled, (state, action) => {
            if(action.payload.status === 200){
                state.requestsData = action.payload.data;
            }
           // toast.error(action.payload.message)
          })
          .addCase(requestsCount.rejected, (state, action) => {
            toast.error(action.payload.message)
          })

          .addCase(sendMessage.fulfilled, (state, action) => {
            if(action.payload.status === 200){
                
            }
          })
          .addCase(sendMessage.rejected, (state, action) => {
            toast.error(action.payload.message)
          })

    }
})

export const {} = chatSlice.actions

export default chatSlice.reducer