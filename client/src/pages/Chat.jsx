import { useEffect, useState } from "react"
import socket from "../socket/socket";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Chat = () =>{
    const [message,setMessage] = useState("");
    const [messages,setMessages] = useState([]);
    const [onlineUsers,setOnlineUsers] = useState(0);
    const { user } = useAuth();
   
    const sendMessage = () =>{
        if(!message.trim()) return;

        socket.emit( 
            "send_message",
            {   
                user: user?.name,
                text:message,
                timestamp : Date.now()
            }
        );
        setMessage("");

        
    }

    useEffect(()=>{
        socket.on("online_users", (count) => setOnlineUsers(count));
        socket.on(
            "receive_message",
            (data) =>{
                toast.info(`${data.user} : ${data.text}`)
                setMessages(
                    (prev) => [...prev , data]
                )
            }
        );

        return ()=>{
            socket.off(
                "receive_message"
            );
        };
    },[])

    return (
        <div>
            <h1>Real Time Chat</h1>
            <h3>Online Users: {onlineUsers}</h3>
            <div>
                {messages.map (
                    (msg,index) => (
                        <p key={index}><strong>{msg.user}:</strong>{msg.text}</p>
                    )
                )}
            </div>
            <input value={message} onChange={(e)=> setMessage(e.target.value)}></input>
            <button onClick={sendMessage}>Send</button>
        </div>
    )

}
export default Chat;