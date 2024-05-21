import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';

import { CircularProgress } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from "../store"

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import Navbar from './shared-components/Navbar';

import { retrieveAccessToken } from '../redux/userSlice';

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

    useEffect(() => {
        if(loginStatus === 0){
            console.log(loginStatus)
            dispatch(retrieveAccessToken());
        }
    }, [loginStatus])

    useEffect(()=>{
        if(loginStatus === 0){
            navigate('/login')
        }
        else{
            navigate('/')
        }
    },[userData]);

    // if(!userData)
    //     return (
    //         <CircularProgress
    //             className='absolute top-1/2 left-1/2'
    //             size={50}
    //             style={{ marginLeft: -25, marginTop: -25 }}
    //         />
    //     )

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path='login' element={<Login />} />
                <Route path='sign-up' element={<SignUp />} />

                <Route path='/' element={<Navbar />}>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/chat' element={<Chat />} />
                </Route>
            </Routes>
        </ThemeProvider>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    , document.getElementById('app'));
}
