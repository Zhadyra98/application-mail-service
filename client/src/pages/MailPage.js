import React, { useState } from "react";
import MessageList from "./MessagesList";

export default function MailPage() {
    const [ recipient, setRecipient ] = useState('')
    const [ title, setTitle ] = useState('')
    const [ message, setMessage ] = useState('')

    const sendMail = async (event) => {
        event.preventDefault();
        let from = localStorage.getItem('userName');
        if(recipient && title && message ){
            const response = await fetch('http://localhost:1337/api/mail', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    },
                body: JSON.stringify({
                    from,
                    recipient,
                    title,
                    message,
                }),
            })
            const data = await response.json()
            if(data.status === 'ok') {
                setRecipient('')
                setTitle('')
                setMessage('')
            } 
            else console.log(data.error)
        }
        else console.log('One of field is empty');
    }

    return(
        <div className="container">
            <div className="d-flex justify-content-center my-5">
                <form onSubmit={sendMail} style={{width: '75%'}}>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Recipient Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="exampleFormControlInput1" 
                            placeholder="Enter name"
                            value={recipient}
                            onChange={e => setRecipient(e.target.value.trim())}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Title</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="exampleInputEmail1"
                            placeholder="Enter Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Message</label>
                        <textarea 
                            className="form-control" 
                            id="exampleFormControlTextarea1" 
                            rows="4"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        >
                        </textarea>
                    </div>
                    <button type="submit" className="btn btn-lg btn-primary mt-2">Send a message</button>
                </form>
            </div>
            <MessageList/>
        </div>
    )
}