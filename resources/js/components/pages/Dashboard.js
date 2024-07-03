import React, { useEffect } from "react";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import ChatPreview from "../shared-components/ChatPreview";
import { useDispatch, useSelector } from "react-redux";
import { getConnections } from "../../redux/userSlice";

const Dashboard = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { connections } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getConnections())
    },[]);

    return(
        <div className="h-full">
          {
            connections.length == 0 ? 
            (
              <p style={{ 
                color: theme.palette.secondary.light,
                fontSize: 25,
                fontWeight: 'bold'
              }}>
                Add friends with the plus button below
              </p>
            )
            : 
            connections.map(connection => (
              <ChatPreview key={connection.id}
                           name={connection.first_name+" "+connection.last_name} 
                           text="Lorem ipsum all the way" />
            ))
          }

          <Box sx={{
             '& > :not(style)': { m: 1 }, 
             position: 'fixed', 
             bottom: 6, 
             right: 12, 
             width: '100%', 
             display: 'flex', 
             justifyContent: 'flex-end' 
          }}>
            <Fab color="primary" aria-label="add"
            onClick={() => navigate('/new-friends')}
            >
              <AddIcon />
            </Fab>
          </Box> 
        </div>
    )
}

export default Dashboard