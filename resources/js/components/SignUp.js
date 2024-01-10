import React, {useState} from "react";
import axios from "axios";

import {  
         TextField,
         Button,
         Typography,
         useTheme,
} from "@mui/material";

import Illustration from "../assets/landing.svg";

import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const singnupHandler = (event) => {
        event.preventDefault();

        let data = {
            firstName,
            lastName,
            email,
            password
        }

        axios({
            // Endpoint to send files
            url: "http://localhost:8000/api/create-user",
            method: "POST",
            data
        })
            // Handle the response from backend here
            .then((res) => {})
 
            // Catch errors if any
            .catch((err) => {});
    }

    const loginNavigation = () => {
        navigate('/')
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
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}
            />
            <Button 
                variant="contained"
                onClick={singnupHandler}
                fullWidth
                sx={{ my: 1,
                        textAlign: 'center',
                        background: theme.palette.primary.main,
                    }}  
            >
            Sign Up
            </Button>
            <Typography sx={{ mt: 2,
                              textAlign: 'center'
                            }}>
                Already registered? <button onClick={loginNavigation} style={{ color: theme.palette.primary.main }}>Login</button>
            </Typography>
        </div>
    )
}

export default SignUp