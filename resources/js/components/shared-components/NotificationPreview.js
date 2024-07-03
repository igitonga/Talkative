import React from "react";

import { useTheme } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; 

const NotificationPreview = (props) => {
    const theme = useTheme();

    const truncateText = (text, maxLength) => {
        if(text.length > maxLength) {
            let truncatedText = text.substring(0, maxLength);
            return truncatedText + '...';
        }
        return text;
    }

    return(
        <div className="flex items-center justify-between" 
             style={{ borderBottom: `1px solid ${theme.palette.background.paper}` }}
        >
            <div  className="flex items-center ">
                <AccountCircle color="action" sx={{ fontSize: '40px' }}/>
                <div className="ml-3">
                    <p>{truncateText(props.data, 25)}</p>
                </div>
            </div>
            <div>
                <ArrowForwardIosIcon />
            </div>
        </div>
    )
}

export default NotificationPreview