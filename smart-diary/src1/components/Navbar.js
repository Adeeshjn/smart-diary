import React from 'react'
import { Link, useHistory, useLocation } from "react-router-dom";


const Navbar = () => {
    let location = useLocation();
    let history = useHistory();
    const handleLogout=()=>{
        localStorage.removeItem('token')
        history.push('/login');
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Park-on</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? <div className='d-flex'>
                        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link></div > : <button onClick={handleLogout} className='btn btn-primary'>Logout</button>
                    }

                </div>
            </div>
        </nav>
        /*<nav id="navbarExample" className="navbar navbar-expand-lg navbar-dark navbar-light" aria-label="Main navigation">
                <div className="container">


                    <a className="navbar-brand logo-image" href="index.html"><img src={Logo} alt="alternative" /></a>


                    <a className="navbar-brand logo-text" href="index.html">Park-on</a>

                    <button className="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav ms-auto navbar-nav-scroll">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="index.html">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="index.html#features">Services</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="index.html#invitation">Locate</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="detail.html">Details</a>
                            </li>

                        </ul>
                        <span className="nav-item">
                            <a className="btn-outline-sm" href="log-in.html">Register / Log in</a>
                        </span>
                    </div>

                </div>

            </nav>*/
    )
}

export default Navbar
