import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (data, { rejectWithValue }) => {
        try {
            toast.loading('Logging in...', { toastId: 'login-user' });
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
            toast.loading('Registering...', { toastId: 'register-user' });
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

export const refreshToken = createAsyncThunk(
    'users/refreshToken',
    async (rejectWithValue) => {
        try {
            let response = await axios.get('api/refresh');
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
);

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
            let response = await axios.get('api/get-users');
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getConnections = createAsyncThunk(
    'users/getConnections',
    async (rejectWithValue) => {
        try {
            let response = await axios.get('api/get-connections');
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
        connectData: null,
        connections: [],
        users: [],
    },
    reducers:{
    },
    extraReducers: (builder) => {
        builder
          .addCase(loginUser.fulfilled, (state, action) => {
            state.userData = action.payload.user;
            state.jwtAccessToken = action.payload.accessToken;
            state.connectData = action.payload.connectsStats;
            state.loginStatus = 1;
    
            axios.defaults.headers.common.Authorization = `Bearer ${action.payload.accessToken}`;
            toast.dismiss('login-user')
          })
          .addCase(loginUser.rejected, (state, action) => {
            toast.update('login-user',
                { render: typeof action.payload.message === 'string' ? action.payload.message : 'Internal server error. Please try again later', type: 'error', isLoading: false, autoClose: 5000, draggable: true, closeOnClick: true }
            );
          })

          .addCase(registerUser.fulfilled, (state, action) => {
            toast.dismiss('register-user')
          })
          .addCase(registerUser.rejected, (state, action) => {
            toast.update('register-user',
                { render: typeof action.payload.message === 'string' ? action.payload.message : 'Internal server error. Please try again later', type: 'error', isLoading: false, autoClose: 5000, draggable: true, closeOnClick: true }
            );
          })

          .addCase(logoutUser.fulfilled, (state, action) => {
            state.jwtAccessToken = null;
            state.userData = null;
            state.loginStatus = 0; 
            state.connectData = null;
            state.users = [];
            toast.dismiss('logout-user')
          })
          .addCase(logoutUser.rejected, (state, action) => {
            toast.update('logout-user',
                { render: typeof action.payload === 'string' ? action.payload: 'Internal server error. Please try again later', type: 'error', isLoading: false, autoClose: 5000, draggable: true, closeOnClick: true }
            );
          })

          .addCase(refreshToken.fulfilled, (state, action) => {
            state.loginStatus = 1;
            state.jwtAccessToken = action.payload.accessToken;
            state.userData = action.payload.user;

            axios.defaults.headers.common.Authorization = `Bearer ${action.payload.accessToken}`;
          })
          .addCase(refreshToken.rejected, (state, action) => {
            state.loginStatus = 0;
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
                toast.error(action.payload.message)
            }
            if(action.payload.status === 200){
                state.users = action.payload.data
            } 
          })
          .addCase(getUsers.rejected, (state, action) => {
            toast.error(action.payload.message);
          })

          .addCase(getConnections.fulfilled, (state, action) => {
            if(action.payload.status !== 200){
                toast.error(action.payload.message)
            }
            if(action.payload.status === 200){
                state.connections = action.payload.data;
            } 
          })
          .addCase(getConnections.rejected, (state, action) => {
            toast.error(action.payload.message);
          })

      },
});

export const {} = userSlice.actions

export default userSlice.reducer