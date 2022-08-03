import React from "react";
import { useNavigate } from 'react-router-dom'

export default function Header () {
    const navigate = useNavigate();
    function goBackButtonHandle () {
        localStorage.removeItem('userName')
        navigate("/")
    }
    return (
        <header className="bg-primary mb-3">
            <div className="container-sm d-flex align-items-center p-2">
                <div className="fs-2 flex-grow-1 d-flex gap-3 align-items-center">
                    <h5 className="h5 text-white ">Email System</h5>
                </div>
                {localStorage.getItem('userName') ? (
                    <button type="button" className="btn btn-outline-light rounded-pill px-4" onClick={goBackButtonHandle} >Logout</button>
                ) : null }
            </div>
        </header>
    );
}