import React, { useEffect } from "react";
import { useTheme } from "@mui/material";

import ChatPreview from "../shared-components/ChatPreview";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/userSlice";

const Dashboard = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { users } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getUsers())
    },[]);

    return(
        <>
          {users !== null && users.map((user)=> (
            <ChatPreview key={user.id}
                         name={user.first_name+" "+user.last_name} 
                         text="Lorem ipsum all the way" />
          ))}  
        </>
    )
}

export default Dashboard