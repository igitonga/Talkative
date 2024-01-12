import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (data, { rejectWithValue }) => {
        try {
            let response = await axios.post('api/login', {
                email: data.email,
                password: data.password
            });
            console.log(response);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: null,
        jwtAccessToken: null,
        loginStatus: 0,
    },
    reducers:{
        setJwtAccessToken: (state, action) => {
            state.jwtAccessToken = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(loginUser.fulfilled, (state, action) => {
            state.jwtAccessToken = action.payload.access_token;
            state.userData = action.payload.user;
    
            if (action.payload.user.last_name) {
              state.userData.first_name += ' ' + action.payload.user.last_name;
            }
            state.loginStatus = 1;
    
            axios.defaults.headers.common.Authorization = `Bearer ${action.payload.access_token}`;
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.loginStatus = 0;
            toast.error(
              typeof action.payload === 'string'
                ? action.payload
                : 'Internal server error. Please try again later'
            );
          });
      },
});

export const {setJwtAccessToken} = userSlice.actions

export default userSlice.reducer