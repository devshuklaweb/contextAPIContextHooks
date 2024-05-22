import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const navigate = useNavigate();

    const [logindet,setLogindet] = useState({name:"Devendra",email:"eve.holt@reqres.in", password:"pistol"});
    
    const onChangeInp = (e) => {
        setLogindet({...logindet,[e.target.name]:e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://reqres.in/api/register`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:logindet.email,password:logindet.password})
        });
        const json = await response.json(); 
        console.log(json,'Register Json Return'); 
        if(json.error) {
            props.showAlert(json.error.toUpperCase(), "danger");
        } else {
            localStorage.setItem('name',logindet.name);
            localStorage.setItem('id',json.id);
            localStorage.setItem('token',json.token);
            navigate('/');
            props.showAlert("User signup successfully", "success");
        }
    } 

    return (
        <>
            <div className="container">
                <h1>Singup</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" value={logindet.name} className="form-control" id="name" name='name' onChange={onChangeInp} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" value={logindet.email} className="form-control" id="email" name='email' onChange={onChangeInp} />
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

export default Signup
