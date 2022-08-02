import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

const EnterPage = () => {
    const [name, setName] = useState('')
    const navigate = useNavigate();
    async function loginUser(event) {
        event.preventDefault();
        const response = await fetch('http://localhost:1337/api/login', {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json',
                },
            body: JSON.stringify({
                name
            }),
        })
        const data = await response.json()

        console.log(data);
        navigate("/messages");
    }


    return(
        <div className="row my-5">
            <div className="col text-center input-group">
                <input 
                    value={name}
                    type="text" 
                    className="form-control" 
                    placeholder="Enter name" 
                    onChange={e => setName(e.target.value)}/>
                <button 
                    className="btn btn-outline-primary" 
                    onClick={loginUser} 
                    type="button">Go
                </button>
            </div>
        </div>
    )
}

export default EnterPage