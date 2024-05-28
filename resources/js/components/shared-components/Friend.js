import React from "react";
import { AccountCircle } from "@mui/icons-material";
import { useTheme, Button } from "@mui/material"; 
import { useNavigate } from "react-router-dom";

const Friend = (props) => {
    const theme = useTheme();
    const navigate = useNavigate();

    return(
        <div className="flex items-center justify-between" 
             style={{ borderBottom: `1px solid ${theme.palette.background.paper}` }}
        >
            <div  className="flex items-center ">
                <AccountCircle color="action" sx={{ fontSize: '70px' }}/>
                <div className="ml-3">
                    <p style={{ fontWeight: 'bold' }}>{props.name}</p>
                </div>
            </div>
            <div>
                <Button 
                    className="normal-case font-bold rounded-full"
                    variant="contained"
                >
                    Wink
                </Button>
            </div>
        </div>
    )
}

export default Friend