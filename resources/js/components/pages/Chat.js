import React, {useEffect, useState} from "react";
import { TextareaAutosize, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

import pusherJs from "pusher-js";

import chatBackground from "../../assets/chat-background.jpg";

import { sendMessage } from "../../redux/chatSlice";

import { useDispatch } from "react-redux";

const useStyles = makeStyles(theme => ({
    body: {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    textBox: {
        position: 'fixed',
        bottom: 0,
        background: theme.palette.background.paper,
    }
}))

const Chat = () => {
    const theme = useTheme();
    const classes = useStyles();
    const dispatch = useDispatch();

    const [textValue, setTextValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [textAreaRows, setTextAreaRows] = useState();

    useEffect(() => {
        pusherJs.logToConsole = false;
    
        const pusher = new pusherJs('5598551358240e592da7', {
          cluster: 'ap1'
        });
    
        const channel = pusher.subscribe('chat');
        channel.bind('message', function(data) {
          setMessages(data)
        });
    },[])

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            dispatch(sendMessage({message: textValue}))
            setTextValue('');
          }
    }

    return(
        <div className={classes.body}>
            <div>
                {console.log({messages: messages})}
            </div>
            <TextareaAutosize className={clsx('w-full p-5', classes.textBox)}
                placeholder="Message"
                onKeyDown={handleKeyDown}
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
            />
        </div>
    )
}

export default Chat