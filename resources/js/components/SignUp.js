import React from "react";

import { FormControl, 
         TextField,
         Button,
         Typography
} from "@mui/material";

import { Link } from "react-router-dom";

const SignUp = () => {
    return(
        <div className="px-4 py-5">
            <FormControl>
                <div className="flex my-2">
                    <TextField
                        id="outlined-fname"
                        label="First name"
                        sx={{ mr: 1 }}
                        type="text"
                    />
                    <TextField
                        id="outlined-lname"
                        label="Last name"
                        sx={{ ml: 1 }}
                        type="text"
                    />
                </div>
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
                >Sign up</Button>
            </FormControl>
            <Typography sx={{ mt: 2,  }}>Already signed up? <Link to="/">Login</Link></Typography>
        </div>
    )
}

export default SignUp