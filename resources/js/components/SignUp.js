import React from "react";

import {  
         TextField,
         Button,
         Typography,
         useTheme,
} from "@mui/material";

import { Link } from "react-router-dom";

const SignUp = () => {
    const theme = useTheme();

    return(
        <div className="px-4 py-5">
            <Typography sx={{ mb:2,
                              textAlign: 'center',
                              fontSize: 'xl'
                            }}>
                Sign up to Talkative
            </Typography>
            <div className="flex mb-2">
                <TextField
                    id="outlined-fname"
                    label="First name"
                    sx={{ mr: 1
                        }}
                    type="text"
                    fullWidth
                />
                <TextField
                    id="outlined-lname"
                    label="Last name"
                    sx={{ ml: 1
                        }}
                    type="text"
                    fullWidth
                />
            </div>
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
                    }}  
            >
            Sign Up
            </Button>
            <Typography sx={{ mt: 2,
                              textAlign: 'center'
                            }}>
                Already registered? <Link to="/">Login</Link>
            </Typography>
        </div>
    )
}

export default SignUp