import React from "react";

import {  
         TextField,
         Button,
         Typography,
         useTheme,
} from "@mui/material";

import Illustration from "../assets/landing.svg";

import { useNavigate } from "react-router-dom";

const Login = () => {
    const theme = useTheme();
    const navigate = useNavigate();

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
            />
            <TextField
                id="outlined-password"
                label="Password"
                sx={{ my: 1
                    }}
                type="password"
                fullWidth
            />
            <Button 
                variant="contained"
                fullWidth
                sx={{ my: 1,
                        textAlign: 'center',
                        background: theme.palette.primary.main,
                        fontWeight: 'bold'
                    }}  
            >
            Login
            </Button>
            <Typography sx={{ mt: 2,
                              textAlign: 'center'
                            }}>
                Not yet registered? <button onClick={signupNavigation} style={{ color: theme.palette.primary.main }}>Sign Up</button>
            </Typography>
        </div>
    )
}

export default Login