import React, { useEffect } from "react";
import { useTheme } from "@mui/material";

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

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
          <Box sx={{ '& > :not(style)': { m: 1 }, position: 'fixed', bottom: 0, width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Box> 
        </>
    )
}

export default Dashboard