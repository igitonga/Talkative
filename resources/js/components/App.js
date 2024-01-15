import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from "../store"

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

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
    const navigate = useNavigate();
    const {loginStatus} = useSelector(state => state.user);

    // useEffect(()=>{
    //     if(loginStatus === 0){
    //         navigate('/login')
    //     }
    //     else{
    //         navigate('/')
    //     }
    // },[loginStatus]);

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='login' element={<Login />} />
                <Route path='sign-up' element={<SignUp />} />
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
