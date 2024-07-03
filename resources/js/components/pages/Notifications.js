import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { Button } from "@mui/material";
import NotificationPreview from "../shared-components/NotificationPreview";

const Notifications = () => {
    const { notificationsData } = useSelector(state => state.notification);

    const handleMarkAllAsRead = () => {

    }

    return(
        <>
            <div className="flex justify-end mb-2">
                <Button 
                    className="rounded-full"
                    variant="contained"
                    size="small"
                    sx={{
                        fontWeight: 'bold',
                        textTransform: 'none',
                        alignItems: 'flex-end'
                    }}  
                    onClick={handleMarkAllAsRead}
                >
                    Mark all as read
                </Button>
            </div>
            {
                notificationsData.map(notification => (
                    <NotificationPreview data={notification.data.data} />
                ))
            }
        </>
    )
}

export default Notifications