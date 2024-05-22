import React, { useContext, useEffect,useRef,useState } from 'react'
import noteContxt from '../context/NoteContext';
export default function List(props) {
    const contexts = useContext(noteContxt);
    const { notes,DeleteUser,EditUser,getUser } = contexts;
    useEffect(()=> {
        getUser();
        // eslint-disable-next-line
    },[])
    //for update
    const ref = useRef(null);
    const refClose = useRef(null);
    const [user,setUser] = useState({id:"",efirst_name:"", elast_name:"", eemail: ''});
    const onChangeInp = (e) => {
        setUser({...user,[e.target.name]:e.target.value});
    }
    const handleClick = (e) => {
        e.preventDefault();
        refClose.current.click();
        EditUser(user.id,user.efirst_name,user.elast_name,user.eemail);
    }
    const UpdateUser = (seluser) => {
        ref.current.click();//jab bhi ref se refrence denge toh ref.current likhna hoga 
        setUser({id:seluser.id,efirst_name:seluser.first_name,elast_name:seluser.last_name,eemail:seluser.email});
    }

    return (
        <>
            <button type="button" className="btn btn-primary" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal" style={{display:'none'}}></button>
            <div className="modal" id="exampleModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3 row">
                                <label htmlFor="eefirst_name" className="col-sm-2 col-form-label">First Name</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="efirst_name" name='efirst_name' onChange={onChangeInp} value={user.efirst_name}/>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="elast_name" className="col-sm-2 col-form-label">Last Name</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="elast_name" name='elast_name' onChange={onChangeInp} value={user.elast_name}/>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="eemail" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="eemail" name='eemail' onChange={onChangeInp} value={user.eemail}/>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className='p-3'>
                    <button className='btn btn-primary'>Add User</button>
                </div>
                {
                    notes.map((item, key) => {
                        return <div className="col-md-3 mx-2 my-2" key={key} style={{float:'left'}}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{item.first_name} - {item.last_name}</h5>
                                    <p className="card-text">{item.email}</p>
                                    <div className='card-text'>
                                        <button className="btn btn-primary mx-2" onClick={()=>{UpdateUser(item)}}>Edit</button>
                                        <button className="btn btn-primary mx-2" onClick={()=>{DeleteUser(item.id)}}>Del</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </>
    )
}
