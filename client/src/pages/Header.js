import React from "react";

export default function Header () {
    return (
        <header className="bg-primary mb-3">
            <div className="container-lg d-flex align-items-center p-2">
                <div className="fs-2 flex-grow-1 d-flex gap-3 align-items-center">
                    <h5 className="h5 text-white ">Email System</h5>
                </div>
            </div>
        </header>
    );
}