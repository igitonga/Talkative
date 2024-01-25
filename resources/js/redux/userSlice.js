import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (data, { rejectWithValue }) => {
        try {
            let response = await axios.post('api/login', {
                email: data.email,
                password: data.password
            });
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const registerUser = createAsyncThunk(
    'users/registerUser',
    async (data, { rejectWithValue }) => {
        try {
            let response = await axios.post('api/register', {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password
            });
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'users/logoutUser',
    async () => {
        return await axios.get('api/logout');
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: null,
        jwtAccessToken: null,
        loginStatus: 0,
        userDataError: null,
    },
    reducers:{
        setJwtAccessToken: (state, action) => {
            state.jwtAccessToken = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(loginUser.fulfilled, (state, action) => {
            if(action.payload.status !== 200){
                state.loginStatus = 0;
                toast.error(action.payload.message)
            }

            if(action.payload.status === 200){
                state.jwtAccessToken = action.payload.access_token;
                state.userData = action.payload.user;
                state.loginStatus = 1;
        
                axios.defaults.headers.common.Authorization = `Bearer ${action.payload.access_token}`;
            }

          })
          .addCase(loginUser.rejected, (state, action) => {
            toast.error(
              typeof action.payload === 'string'
                ? action.payload
                : 'Internal server error. Please try again later'
            );
          })

          .addCase(registerUser.fulfilled, (state, action) => {
            if(action.payload.status !== 200){
                toast.error(action.payload.message)
            }
          })
          .addCase(registerUser.rejected, (state, action) => {
            toast.error(
              typeof action.payload === 'string'
                ? action.payload
                : 'Internal server error. Please try again later'
            );
          })

          .addCase(logoutUser.fulfilled, (state, action) => {
            state.jwtAccessToken = null;
            state.userData = null;
            state.loginStatus = 0; 
          })
          .addCase(logoutUser.rejected, (state, action) => {
            toast.error(
              typeof action.payload === 'string'
                ? action.payload
                : 'Internal server error. Please try again later'
            );
          })

      },
});

export const {setJwtAccessToken} = userSlice.actions

export default userSlice.reducer