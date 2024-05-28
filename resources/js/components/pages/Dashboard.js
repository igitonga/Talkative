import React, { useEffect } from "react";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { makeStyles } from "@mui/styles";

import ChatPreview from "../shared-components/ChatPreview";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/userSlice";

const useStyles = makeStyles(theme => ({
  faintText: {
    color: theme.palette.secondary.light,
    fontSize: 25,
    fontWeight: 'bold',
  }
}))

const Dashboard = () => {
    const theme = useTheme();
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { connections } = useSelector(state => state.user)

    useEffect(() => {
        //dispatch(getUsers())
    },[]);

    return(
        <div className="h-full">
          {/* {users !== null && users.map((user)=> (
            <ChatPreview key={user.id}
                         name={user.first_name+" "+user.last_name} 
                         text="Lorem ipsum all the way" />
          ))}  */}

          {connections.length == 0 && (
            <p className={classes.faintText}>Add friends with the plus button below</p>
          )}

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