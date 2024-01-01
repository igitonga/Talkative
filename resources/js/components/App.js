import React from 'react';
import ReactDOM from 'react-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './Login';
import SignUp from './SignUp';

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
    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='sign-up' element={<SignUp />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    , document.getElementById('app'));
}
