import React, {useEffect, useState} from "react";
import { TextareaAutosize, useTheme } from "@mui/material";

import pusherJs from "pusher-js";

import chatBackground from "../../assets/chat-background.jpg";

import { sendMessage } from "../../redux/chatSlice";

import { useDispatch } from "react-redux";

const Chat = () => {
    const theme = useTheme();
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
        <div style={{ 
                    backgroundSize: 'cover', 
                    backgroundRepeat: 'no-repeat' 
                }}>
            <div>
                {console.log({messages: messages})}
            </div>
            <TextareaAutosize 
                className='w-full p-5'
                sx={{ 
                    position: 'fixed',
                    bottom: 0,
                    background: theme.palette.background.paper, 
                }} 
                placeholder="Message"
                onKeyDown={handleKeyDown}
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
            />
        </div>
    )
}

export default Chat