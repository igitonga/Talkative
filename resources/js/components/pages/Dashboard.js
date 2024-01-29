import React from "react";
import { useTheme } from "@mui/material";

import ChatPreview from "../shared-components/ChatPreview";

const Dashboard = () => {
    const theme = useTheme();

    return(
        <>
            <ChatPreview />
            <ChatPreview />
            <ChatPreview />
        </>
    )
}

export default Dashboard