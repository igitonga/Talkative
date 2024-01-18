import React, { useState } from "react";

import {  
         TextField,
         Button,
         Typography,
         useTheme,
} from "@mui/material";

import Illustration from "../../assets/landing.svg";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/userSlice";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const submitLogin = () => {
        if(email === '' || password === '') {
            toast.error('You cannot leave fields empty');
            return;
        }
        setLoading(true);
        dispatch(loginUser({ email, password }));

        setEmail('');
        setPassword('');
        setLoading(false)
    }

    const signupNavigation = () => {
        navigate('/sign-up')
    }

    return(
        <div className="px-4 py-5">
            <div className="flex items-center">
                <img src={Illustration} alt="Illustration" className="my-4" style={{ width: '150px', height: '150px' }}/>
                <Typography sx={{ ml:3,
                              textAlign: 'center',
                              fontSize: '40px',
                              color: theme.palette.primary.main,
                              fontWeight: 'bold'
                            }}>
                    Talkative
                </Typography>
            </div>
            <Typography sx={{ my:1,
                              fontSize: '20px',
                              color: theme.palette.primary.main,
                              fontWeight: 'bold'
                            }}>
                Welcome back
            </Typography>
            <TextField
                id="outlined-email"
                label="Email"
                sx={{ my: 1
                    }}
                type="email"
                fullWidth
                value={email}
                onChange={ (e) => {
                    setEmail(e.target.value)
                }}
            />
            <TextField
                id="outlined-password"
                label="Password"
                sx={{ my: 1
                    }}
                type="password"
                fullWidth
                value={password}
                onChange={ (e) => {
                    setPassword(e.target.value)
                }}
            />
            <Button 
                variant="contained"
                fullWidth
                sx={{ my: 1,
                        textAlign: 'center',
                        background: theme.palette.primary.main,
                        fontWeight: 'bold'
                    }} 
                onClick={() => submitLogin()} 
            >
            {loading ? 'Loading...' : 'Login'}
            </Button>
            <Typography sx={{ mt: 2,
                              textAlign: 'center'
                            }}>
                Not yet registered? <button onClick={signupNavigation} style={{ color: theme.palette.primary.main }}>Sign Up</button>
            </Typography>
            <ToastContainer />
        </div>
    )
}

export default Login