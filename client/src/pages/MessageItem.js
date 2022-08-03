import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

export default function MessageItem({title , from , message , id , isRead}){
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal)
    }
    const openMailHandler = async (e) => {
        e.preventDefault();
        const response = await fetch('https://email-system-app.herokuapp.com/api/mail',{
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
            }),
        })
        const data = await response.json()
    
        if(data.status === 'ok'){ 
            console.log("ok")
        }
        else{ 
            console.log("error")
        }
    }
    return(
        <>
            <tr 
            className = {"d-flex border border-primary border-opacity-50 p-2 mb-2 rounded bg-primary text-dark  " + (isRead ? "bg-opacity-10 fw-normal" : "bg-opacity-25 fw-bold")}
            onClick={(e) => { openMailHandler(e); toggle();}}>
                <td className="col-4"><small className="text-muted">From: </small>{localStorage.getItem('userName') === from ? "ME" : from }</td>
                <td className="col-8" >{title}</td> 
            </tr>
            <Modal isOpen={modal} toggle={toggle} className="p-4">
                <ModalHeader toggle={toggle}>{title}</ModalHeader>
                <ModalBody>
                    <small className="text-muted">From: </small>{from} <br/> <br/>
                    {message}
                </ModalBody>
            </Modal>
        </>
    )
}