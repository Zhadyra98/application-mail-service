import React, { useState, useEffect} from "react";
import MessageList from "./MessagesList";
import Select , { components } from 'react-select';

export default function MailPage() {
    const [ title, setTitle ] = useState('')
    const [ message, setMessage ] = useState('')
    const [ selectedOption, setSelectedOption] = useState(null);
    const [ options, setOptions ] = useState([])

    useEffect(() => {
        const url = 'http://localhost:1337/api/login';
        const getAllRecipientsList = async() => {
            const req = await fetch(url,{
                headers: {
                    'x-access-token': localStorage.getItem('userName'),
                },
            });
            const data = await req.json()
            if(data.status === 'ok'){ 
                console.log(data.recipients);
                setOptions(data.recipients.map((item) => ({ value: item.name, label: item.name })));
            }
        };
        getAllRecipientsList();
        const comInterval = setInterval(getAllRecipientsList, 5000);
        return () => clearInterval(comInterval)
    }, [] ); 

    const sendMail = async (event) => {
        event.preventDefault();
        let from = localStorage.getItem('userName');
        let recipients = selectedOption.map(item => item.value)
        if(recipients && title && message ){
            const response = await fetch('http://localhost:1337/api/mail', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    },
                body: JSON.stringify({
                    from,
                    recipients,
                    title,
                    message,
                }),
            })
            const data = await response.json()
            if(data.status === 'ok') {
                setSelectedOption(null)
                setTitle('')
                setMessage('')
            } 
            else console.log(data.error)
        }
        else console.log('One of field is empty');
    }

    const NoOptionsMessage = props => {
        return (
            <components.NoOptionsMessage {...props}>
                <span className="custom-css-class">No such recipient</span> 
            </components.NoOptionsMessage>
        );
    };

    return(
        <div className="container">
            <div className="d-flex justify-content-center mb-3">
                <form onSubmit={sendMail} className= "mailServiceContent" >
                    <div className="form-group mb-2">
                        <Select
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        value={selectedOption}
                        options={options}
                        placeholder={"Recipients"}
                        isMulti={true}
                        components={{ NoOptionsMessage }}
                        />
                    </div>
                    <div className="form-group mb-2">
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