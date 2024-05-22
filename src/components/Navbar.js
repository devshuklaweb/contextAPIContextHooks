//rce
import React, { useEffect } from 'react'
import { Link, useLocation,useNavigate } from 'react-router-dom'

export default function Navbar() {
    let location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        console.log(location, "location object");
        console.log(location.pathname, "location path");
        // eslint-disable-next-line
    }, [location]) //jb bhi location update hogi tab kaam krega

    const handleLogout = () => {
        localStorage.removeItem("id");
        localStorage.removeItem("name");
        localStorage.removeItem("token");
        navigate("/");
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link className={`nav-link ${location.pathname === '/' ? 'active' : ''} `} aria-current="page" to="/">Home</Link></li>
                            {
                                localStorage.getItem("token") ?
                                    <>
                                    <li className="nav-item"><Link className={`nav-link ${location.pathname === '/users' ? 'active' : ''} `} aria-current="page" to="/users">Users</Link></li>
                                    <li className="nav-item"><Link className={`nav-link ${location.pathname === '/adduser' ? 'active' : ''} `} aria-current="page" to="/adduser">Add User</Link></li>}
                                    </>
                                :
                                null
                            }
                            <li className="nav-item"><Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''} `} aria-current="page" to="/about">About</Link></li>
                        </ul>
                    </div>
                    {!localStorage.getItem("token") ? <form className="d-flex">
                        <Link className="btn btn-primary mx-3" to="/login">Login</Link>
                        <Link className="btn btn-primary mx-3" to="/signup">Register</Link>
                    </form> : <button onClick={handleLogout} className="btn btn-primary mx-3">Logout</button>}
                </div>
            </nav>
        </>
    )
}

