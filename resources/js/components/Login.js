import React from "react";

import {  
         TextField,
         Button,
         Typography,
         useTheme,
} from "@mui/material";

import { Link } from "react-router-dom";

const Login = () => {
    const theme = useTheme();

    return(
        <div className="px-4 py-5">
            <Typography sx={{ mb:2,
                              textAlign: 'center',
                              fontSize: 'xl'
                            }}>
                Welcome back to Talkative
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
                    }}  
            >
            Login
            </Button>
            <Typography sx={{ mt: 2,
                              textAlign: 'center'
                            }}>
                Not yet registered? <Link to="sign-up">Sign Up</Link>
            </Typography>
        </div>
    )
}

export default Login