import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

export default function EnterPage() {
    const [name, setName] = useState('')
    const navigate = useNavigate();
    async function loginUser(event) {
        event.preventDefault();
        const response = await fetch('https://email-system-app.herokuapp.com/api/login', {
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
        <>
            <div className="login-form mx-auto mt-5">
                <form className="p-4" method="post" onSubmit={loginUser}>
                    <h3 className="text-center mb-2">Welcome</h3>       
                    <div className="form-group">
                        <input 
                        value={name}
                        type="text" 
                        className="form-control border rounded-0" 
                        placeholder="Name" 
                        required="required"
                        onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" 
                        className="btn btn-primary btn-block fw-bold border rounded-0 mt-2 w-100">Log in</button>
                    </div>       
                </form>
            </div>
        </>

    )
}