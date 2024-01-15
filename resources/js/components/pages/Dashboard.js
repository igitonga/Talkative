import React from "react";
import { useTheme } from "@mui/material";

import Navbar from "../shared-components/Navbar";
import ChatPreview from "../shared-components/ChatPreview";

const Dashboard = () => {
    const theme = useTheme();

    return(
        <>
            <Navbar />
            <ChatPreview />
            <ChatPreview />
            <ChatPreview />
        </>
    )
}

export default Dashboard