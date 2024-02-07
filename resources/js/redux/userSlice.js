import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (data, { rejectWithValue }) => {
        try {
            toast.loading('Loading...', { toastId: 'login-user' });
            let response = await axios.post('api/auth/login', {
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
            toast.loading('Loading...', { toastId: 'register-user' });
            let response = await axios.post('api/auth/register', {
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
        return await axios.get('api/auth/logout');
    }
)

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (data, { rejectWithValue }) => {
        try {
            toast.loading('Loading...', { toastId: 'update-user' });
            let response = await axios.post('api/update-user', data);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async (rejectWithValue) => {
        try {
            toast.loading('Getting users...', { toastId: 'get-users' });
            let response = await axios.get('api/get-users');
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
        users: null,
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
                toast.update(
                    'login-user',
                    { render: typeof action.payload.message === 'string' ? action.payload.message : 'Internal server error', type: 'error', isLoading: false, autoClose: 5000, draggable: true, closeOnClick: true }
                )
            }

            if(action.payload.status === 200){
                state.jwtAccessToken = action.payload.access_token;
                state.userData = action.payload.user;
                state.loginStatus = 1;
        
                axios.defaults.headers.common.Authorization = `Bearer ${action.payload.access_token}`;
                toast.dismiss('login-user')
            }

          })
          .addCase(loginUser.rejected, (state, action) => {
            toast.update('login-user',
                { render: typeof action.payload === 'string' ? action.payload: 'Internal server error. Please try again later', type: 'error', isLoading: false, autoClose: 5000, draggable: true, closeOnClick: true }
            );
          })

          .addCase(registerUser.fulfilled, (state, action) => {
            if(action.payload.status !== 200){
                toast.update('register-user',
                    { render: action.payload.message, type: 'error', isLoading: false, autoClose: 5000, draggable: true, closeOnClick: true }
                )
            }
            if(action.payload.status === 200){
                toast.update('register-user',
                    { render: action.payload.message, type: 'success', isLoading: false, autoClose: 5000, draggable: true, closeOnClick: true }
                )
            }
          })
          .addCase(registerUser.rejected, (state, action) => {
            toast.update('register-user',
                { render: typeof action.payload === 'string' ? action.payload: 'Internal server error. Please try again later', type: 'error', isLoading: false, autoClose: 5000, draggable: true, closeOnClick: true }
            );
          })

          .addCase(logoutUser.fulfilled, (state, action) => {
            state.jwtAccessToken = null;
            state.userData = null;
            state.loginStatus = 0; 
            toast.dismiss('logout-user')
          })
          .addCase(logoutUser.rejected, (state, action) => {
            toast.update('logout-user',
                { render: typeof action.payload === 'string' ? action.payload: 'Internal server error. Please try again later', type: 'error', isLoading: false, autoClose: 5000, draggable: true, closeOnClick: true }
            );
          })

          .addCase(updateUser.fulfilled, (state, action) => {
            if(action.payload.status !== 200){
                toast.update('register-user',
                    { render: action.payload.message, type: 'error', isLoading: false, autoClose: 5000, draggable: true, closeOnClick: true }
                )
            }
            if(action.payload.status === 200){
                toast.update('update-user',
                    { render: action.payload.message, type: 'success', isLoading: false, autoClose: 5000, draggable: true, closeOnClick: true }
                )
            }
          })
          .addCase(updateUser.rejected, (state, action) => {
            toast.update('update-user',
                { render: typeof action.payload === 'string' ? action.payload.message : 'Internal server error. Please try again later', type: 'error', isLoading: false, autoClose: 5000, draggable: true, closeOnClick: true }
            );
          })

          .addCase(getUsers.fulfilled, (state, action) => {
            if(action.payload.status !== 200){
                toast.update('get-users',
                    { render: action.payload.message, type: 'error', isLoading: false, autoClose: 5000, draggable: true, closeOnClick: true }
                )
            }
            if(action.payload.status === 200){
                state.users = action.payload.data
                toast.dismiss('get-users')
            } 
          })
          .addCase(getUsers.rejected, (state, action) => {
            toast.update('get-users',
                { render: typeof action.payload === 'string' ? action.payload.message : 'Internal server error. Please try again later', type: 'error', isLoading: false, autoClose: 5000, draggable: true, closeOnClick: true }
            );
          })

      },
});

export const {setJwtAccessToken} = userSlice.actions

export default userSlice.reducer