import React from "react";

import { FormControl, 
         TextField,
         Button,
         Typography
} from "@mui/material";

import { Link } from "react-router-dom";


const Login = () => {
    return(
        <div className="px-4 py-5">
            <FormControl>
                <TextField
                    id="outlined-email"
                    label="Email"
                    sx={{ my: 1 }}
                    type="email"
                />
                <TextField
                    id="outlined-password"
                    label="Password"
                    sx={{ my: 1 }}
                    type="password"
                />
                <Button 
                    variant="contained"
                    sx={{ my: 1 }}
                >Login</Button>
            </FormControl>
            <Typography sx={{ mt: 2,  }}>Not yet registered? <Link to="sign-up">Sign Up</Link></Typography>
        </div>
    )
}

export default Login