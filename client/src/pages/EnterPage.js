import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

export default function EnterPage() {
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
        localStorage.setItem('userName', data.userName)
        navigate("/mail");
    }

    return(
        <div className=" my-5 container">
            <div className="mailServiceContent col">
                <input 
                    value={name}
                    type="text" 
                    className="form-control" 
                    placeholder="Enter name" 
                    onChange={e => setName(e.target.value)}/>
                <button 
                    className="btn btn-primary" 
                    onClick={loginUser} 
                    type="button">Enter
                </button>
            </div>
            {/* <form className="row g-2">
                <div className="col-auto">
                    <label htmlFor="inputPassword2" className="visually-hidden" onChange={e => setName(e.target.value)} value={name} >Name</label>
                    <input type="text" className="form-control" id="inputPassword2" placeholder="Name"/>
                </div>
                <div className="col-auto">
                    <button type="button" onClick={loginUser} className="btn btn-primary mb-3">Enter</button>
                </div>
            </form> */}
        </div>
    )
}