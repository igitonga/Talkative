import React from "react";
import { AccountCircle } from "@mui/icons-material";
import { useTheme, Button } from "@mui/material"; 
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { friendRequest } from "../../redux/chatSlice";

const Friend = (props) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFreindRequest = () => {
        dispatch(friendRequest({userId: props.id}))
    }

    return(
        <div className="flex items-center justify-between" 
             style={{ borderBottom: `1px solid ${theme.palette.background.paper}` }}
        >
            <div  className="flex items-center ">
                <AccountCircle color="action" sx={{ fontSize: '50px' }}/>
                <div className="ml-3">
                    <p style={{ fontWeight: 'bold' }}>{props.name}</p>
                </div>
            </div>
            <div>
                <Button 
                    className="normal-case rounded-full"
                    variant="contained"
                    size="small"
                    sx={{
                        fontWeight: 'bold',
                    }}  
                    onClick={handleFreindRequest}
                >
                    Add
                </Button>
            </div>
        </div>
    )
}

export default Friend