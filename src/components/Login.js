import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Login = (props) => {

    const navigate = useNavigate();

    const [logindet,setLogindet] = useState({email:"eve.holt@reqres.in", password:"cityslicka"});
    
    const onChangeInp = (e) => {
        setLogindet({...logindet,[e.target.name]:e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://reqres.in/api/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(logindet)
        });
        const json = await response.json(); 
        console.log(json,'Login Json Return'); 
        if(json.error) {
            props.showAlert(json.error.toUpperCase(), "danger");
            //alert("Error: " + json.error);
        } else {
            localStorage.setItem('token',json.token);
            props.showAlert("Login Successfully.", "success");
            navigate('/');
        }
    } 

    return (
        <>
            <div className="container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" value={logindet.email} className="form-control" id="email" name='email' onChange={onChangeInp} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" value={logindet.password} className="form-control" id="password" name='password' onChange={onChangeInp}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login
