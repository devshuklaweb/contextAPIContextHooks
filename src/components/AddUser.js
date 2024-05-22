import React, { useContext, useState,useEffect } from 'react'
import noteContxt from '../context/NoteContext';
import {useNavigate } from 'react-router-dom'

const AddUser = (props) => {

    const contexts = useContext(noteContxt);
    const { addUser  } = contexts;

    const navigate = useNavigate();
    const {showAlert} = props;
    useEffect(() => {
        if(!localStorage.getItem("token")) {
            navigate("/");
        }
    },[])

    const [user,setUser] = useState({first_name:"", last_name:"", email: ''});
    const handleClick = (e) => {
        e.preventDefault();
        addUser(user.first_name,user.first_name,user.email);
        setUser({first_name:"", last_name:"", email: ''})
        props.showAlert("User added successfully","success")
    }
    const onChangeInp = (e) => {
        setUser({...user,[e.target.name]:e.target.value});
    }

    return (
        <>
            <div className="container">
                <div className="mb-3 row">
                    <h1>Add User</h1>
                </div>
                <form className='my-3' id='userFrm'>
                    <div className="mb-3 row">
                        <label htmlFor="first_name" className="col-sm-2 col-form-label">First Name</label>
                        <div className="col-sm-10">
                            <input type="text" value={user.first_name} className="form-control" id="first_name" name='first_name' onChange={onChangeInp} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="last_name" className="col-sm-2 col-form-label">Last Name</label>
                        <div className="col-sm-10">
                            <input type="text" value={user.last_name} className="form-control" id="last_name" name='last_name' onChange={onChangeInp} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="text" value={user.email} className="form-control" id="email" name='email' onChange={onChangeInp} />
                        </div>
                    </div>
                    
                    <div className="mb-3 row">
                        <button type='submit' className='btn btn-primary col-md-2 p-1' onClick={handleClick}>Submit</button>
                    </div>
                </form>
            </div>
            
        </>
    )
}

export default AddUser
