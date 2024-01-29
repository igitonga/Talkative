import React, { useState } from "react";
import {  
    TextField,
    Button,
    Typography,
    useTheme,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/userSlice";

import { ToastContainer } from "react-toastify";

const Profile = () => {
    const theme = useTheme()
    const { userData } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [firstName, setFirstName] = useState(userData.first_name);
    const [lastName, setLastName] = useState(userData.last_name);
    const [email, setEmail] = useState(userData.email);
    const [gender, setGender] = useState(userData.gender);
    const [dob, setDob] = useState(userData.dob);
    const [country, setCountry] = useState(userData.country);

    const data = {
        firstName,
        lastName,
        email,
        dob,
        gender,
        country
    }

    const updateHandler = () => {
        setLoading(true)
        dispatch(updateUser(data))
        setLoading(false)
    }

    return(
        <div className="px-4">
            <span className="flex justify-center">
                <AccountCircle color="action" sx={{ fontSize: '120px' }}/>
            </span>
            <span className="flex justify-center my-4 p-4" style={{ boxShadow: `0px 0px 5px ${theme.palette.background.paper}`, borderRadius: '10px' }}>
                <Typography sx={{ fontSize: '20px',
                              color: theme.palette.primary.main,
                              fontWeight: 'bold'
                            }}>
                    {firstName+" "+lastName}
                </Typography>
            </span>
            <span className="">
                <div className="flex mb-2">
                    <TextField
                        id="outlined-fname"
                        label="First name"
                        sx={{ mr: 1
                            }}
                        type="text"
                        fullWidth
                        value={firstName}
                        onChange={ (e) => {setFirstName(e.target.value)} }
                    />
                    <TextField
                        id="outlined-lname"
                        label="Last name"
                        sx={{ ml: 1
                            }}
                        type="text"
                        fullWidth
                        value={lastName}
                        onChange={ (e) => {setLastName(e.target.value)} }
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
                    onChange={ (e) => {setEmail(e.target.value)} }
                />
                <TextField
                    id="outlined-dob"
                    label="Date of birth"
                    sx={{ my: 1
                        }}
                    type="date"
                    fullWidth 
                    value={dob == null ? '' : dob}
                    onChange={ (e) => {setDob(e.target.value)} }
                />
                <TextField
                    id="outlined-gender"
                    label="Gender"
                    sx={{ my: 1
                        }}
                    type="text"
                    fullWidth
                    value={gender == null ? '' : gender}
                    onChange={ (e) => {setGender(e.target.value)} }
                />
                <TextField
                    id="outlined-country"
                    label="Country"
                    sx={{ my: 1
                        }}
                    type="text"
                    fullWidth
                    value={country == null ? '' : country}
                    onChange={ (e) => {setCountry(e.target.value)} }
                />
            </span>
            <Button 
                variant="contained"
                fullWidth
                sx={{ my: 1,
                        textAlign: 'center',
                        background: theme.palette.primary.main,
                        fontWeight: 'bold'
                    }} 
                onClick={updateHandler}    
            >
            {loading ? 'Loading...' : 'Update'}
            </Button>
            <ToastContainer />
        </div>
    )
}

export default Profile