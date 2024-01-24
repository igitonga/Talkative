import React, {useState} from "react";

import {  
         TextField,
         Button,
         Typography,
         useTheme,
} from "@mui/material";

import Illustration from "../../assets/landing.svg";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/userSlice";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const loginNavigation = () => {
        navigate('/login')
    }

    const submitSignup = () => {
        if(firstName === '' || lastName === '' || email === '' || password === '') {
            toast.error('You cannot leave fields empty')
            return;
        }
        setLoading(true);
        dispatch(registerUser({firstName, lastName, email, password}))

        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setLoading(false);
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
                Sign Up
            </Typography>
            <div className="flex mb-2">
                <TextField
                    id="outlined-fname"
                    label="First name"
                    sx={{ mr: 1
                        }}
                    type="text"
                    fullWidth
                    value={firstName}
                    onChange={(e)=>{
                        setFirstName(e.target.value)
                    }}
                />
                <TextField
                    id="outlined-lname"
                    label="Last name"
                    sx={{ ml: 1
                        }}
                    type="text"
                    fullWidth
                    value={lastName}
                    onChange={(e)=>{
                        setLastName(e.target.value)
                    }}
                />
            </div>
            <TextField
                id="outlined-email"
                label="Email"
                sx={{ my: 1
                    }}
                type="email"
                fullWidth
                value={email}
                onChange={(e)=>{
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
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}
            />
            <Button 
                variant="contained"
                fullWidth
                sx={{ my: 1,
                        textAlign: 'center',
                        background: theme.palette.primary.main,
                        fontWeight: 'bold',
                    }}  
                onClick={() => submitSignup()} 
            >
            {loading ? 'Loading' : 'Sign Up'}
            </Button>
            <Typography sx={{ mt: 2,
                              textAlign: 'center'
                            }}>
                Already registered? <button onClick={loginNavigation} style={{ color: theme.palette.primary.main }}>Login</button>
            </Typography>
            <ToastContainer />
        </div>
    )
}

export default SignUp