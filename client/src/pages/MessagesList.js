import React, { useState, useEffect } from 'react'
import MessageItem from './MessageItem';

export default function MessageList() {
    const [ messages, setMessages ] = useState([]);

    useEffect(() => {
        const url = 'http://localhost:1337/api/mail';
        const fetchData = async() => {
            const req = await fetch(url,{
                headers: {
                    'x-access-token': localStorage.getItem('userName'),
                },
            });
            const data = await req.json()
            if(data.status === 'ok'){ 
                console.log(data.messages);
                
                setMessages(data.messages)
            }
        };
        fetchData();
    }, [] ); 

    return(
        <div className="d-flex justify-content-center "> 
            <table className = "" style={{width: '60%'}} >
                <tbody>
                    {messages.map((item) => (
                        <MessageItem 
                        key = {item._id}
                        from={item.from} 
                        title={item.title} 
                        message={item.message}
                        isRead={item.isRead}
                        id={item._id}
                        />
                    ))}
                </tbody>
            </table>
        </div>

    )
}