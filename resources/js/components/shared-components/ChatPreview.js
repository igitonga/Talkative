import React from "react";
import { AccountCircle } from "@mui/icons-material";
import { useTheme } from "@mui/material"; 

const ChatPreview = (props) => {
    const theme = useTheme();

    return(
        <div className="flex p-2 items-center" style={{ borderBottom: `1px solid ${theme.palette.background.paper}` }}>
            <AccountCircle color="action" sx={{ fontSize: '50px' }}/>
            <div className="ml-3">
                <p style={{ fontWeight: 'bold' }}>{props.name}</p>
                <p style={{ fontSize: '12px' }}>{props.text}</p>
            </div>
        </div>
    )
}

export default ChatPreview