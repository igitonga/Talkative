import React, { useEffect } from "react";
import { useTheme } from "@mui/material";

import { makeStyles } from "@mui/styles";

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

    return(
        <>
            {users.map(user => (
                <Friend 
                    name={`${user.first_name} ${user.last_name}`}
                />
            ))}
        </>
    )
}

export default NewFriends