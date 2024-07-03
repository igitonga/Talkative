import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';

import { CircularProgress } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from "../store"

import Navbar from './shared-components/Navbar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import NewFriends from './pages/NewFriends';
import Notifications from './pages/Notifications';

import { refreshToken } from '../redux/userSlice';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FFA500',
        },
        secondary: {
            main: '#800080',
            light: '#90EE90',
        },
        background: {
            paper: '#F7F7FC',
        },
        common: {
            black: '#4E4B66',
            white: '#000000',
            gray: '#808080',
            label: '#6E7191',
        },
        warning: {
            main: '#FFF4DB',
        },
        error: {
            main: '#E87D66',
        },
    },
    typography: {
        fontFamily: [
            'Inter',
            'sans-serif',
        ].join(','),
    },
    breakpoints: {
        // Values set according to tailwind breakpoints
        values: {
            xs: 0,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
        },
    },
});

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loginStatus, userData} = useSelector(state => state.user);

    const queryClient = new QueryClient();

    useEffect(() => {
        if(loginStatus === 0)
            dispatch(refreshToken())
    }, [loginStatus])

    useEffect(()=>{
        if(loginStatus === 0){
            navigate('/login')
        }
        else{
            navigate('/')
        }
    },[userData]);

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path='login' element={<Login />} />
                <Route path='sign-up' element={<SignUp />} />

                <Route path='/' element={<Navbar />}>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/chat' element={<Chat />} />
                    <Route path='/new-friends' element={<NewFriends />} />
                    <Route path='/notifications' element={<Notifications />} />
                </Route>
            </Routes>

            {/* For toast notifications */}
            <ToastContainer
                hideProgressBar
                theme='colored'
                position='top-right'
                autoClose={2000}
            />
        </ThemeProvider>
    );
}

export default App;

ReactDOM.createRoot(document.getElementById('app')).render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);