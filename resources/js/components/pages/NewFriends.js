import React, { useEffect } from "react";
import { useTheme, CircularProgress } from "@mui/material";

import { getUsers } from "../../redux/userSlice";

import { useDispatch, useSelector } from "react-redux";

import Friend from "../shared-components/Friend";

const NewFriends = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const { users } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getUsers())
    },[])

    if(users.length == 0) 
        return (
            <CircularProgress
                className='absolute top-1/2 left-1/2'
                size={50}
                style={{ marginTop: 70, marginRight: 10 }}
            />
        )
    

    return(
        <>
            {users.map(user => (
                <Friend
                    key={user.id} 
                    name={`${user.first_name} ${user.last_name}`}
                    id={user.id}
                />
            ))}
        </>
    )
}

export default NewFriends