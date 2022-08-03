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
                setMessages(data.messages)
            }
        };
        fetchData();
        const comInterval = setInterval(fetchData, 5000);
        return () => clearInterval(comInterval)
    }, [] ); 
    return(
        <div className="d-flex justify-content-center "> 
            {(messages.length) ? (
                <table className = "mailServiceContent" >
                    <tbody>
                        {[...messages].reverse().map((item) => (
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
                ) : (<h5 className='text-center fw-light'> No incoming emails for you...</h5>) }
        </div>
    )
}