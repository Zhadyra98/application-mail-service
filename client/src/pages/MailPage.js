import React, { useState, useEffect} from "react";
import MessageList from "./MessagesList";
import Select , { components } from 'react-select';

export default function MailPage() {
    const [ recipient, setRecipient ] = useState('')
    const [ title, setTitle ] = useState('')
    const [ message, setMessage ] = useState('')
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedOption, setSelectedOption] = useState(null);
    let from = localStorage.getItem('userName');

    const sendMail = async (event) => {
        event.preventDefault();
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
        const comInterval = setInterval(fetchData, 5000);
        return () => clearInterval(comInterval)
    }, [] ); 

    const NoOptionsMessage = props => {
        return (
            <components.NoOptionsMessage {...props}>
                <span className="custom-css-class">No such recipient</span> 
            </components.NoOptionsMessage>
        );
    };

    return(
        <div className="container">
            <div className="d-flex justify-content-center my-5">
                <form onSubmit={sendMail} className= "mailServiceContent" >
                    <div className="form-group mb-2">
                        <Select
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
                        placeholder={"Recipients"}
                        isMulti={true}
                        components={{ NoOptionsMessage }}
                        />
                    </div>
                    {/* <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Recipient Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="exampleFormControlInput1" 
                            placeholder="Enter name"
                            value={recipient}
                            onChange={e => setRecipient(e.target.value.trim())}
                        />
                    </div> */}
                    <div className="form-group mb-2">
                        {/* <label htmlFor="exampleInputEmail1">Title</label> */}
                        <input 
                            type="text" 
                            className="form-control" 
                            id="exampleInputEmail1"
                            placeholder="Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <textarea 
                            className="form-control" 
                            id="exampleFormControlTextarea1"
                            placeholder="Message body" 
                            rows="4"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        >
                        </textarea>
                    </div>
                    <button type="submit" className="btn btn-primary mt-2">Send a message</button>
                </form>
            </div>
            <MessageList/>
        </div>
    )
}