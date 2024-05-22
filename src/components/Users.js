import React, { useEffect } from 'react'
import AddUser from './AddUser';
import List from './List';
import {useNavigate } from 'react-router-dom'

const Users = (props) => {
    const navigate = useNavigate();
    const {showAlert} = props;
    useEffect(() => {
        if(!localStorage.getItem("token")) {
            navigate("/");
        }
    },[])
    return (
        <>  
            <AddUser showAlert={showAlert}/>
            <div className="container">
            <h1><u>List Of Users using context api demo</u></h1>
            <List showAlert={showAlert} />
            </div>
        </>
    )
}

export default Users
