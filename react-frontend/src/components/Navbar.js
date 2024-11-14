import { Link } from "react-router-dom";
import React from "react";
import Logo from '../assets/logo192.png';
import { useLocation } from "react-router-dom";

function Navbar(){

    const location = useLocation();
    let nav_style = {};
    let nav_class_properties = '';

    if(location.pathname === '/'){
        nav_style = {};
        nav_class_properties = 'navbar navbar-expand-md navbar-dark navbar-custom fixed-top';
    }
    else{
        nav_style = {
            backgroundColor: '#113448'
        };
        nav_class_properties = 'navbar navbar-expand-md navbar-dark navbar-custom fixed-top top-nav-collapse';
    }


    return (
        // <!-- Navbar -->
        <nav className={nav_class_properties} 
        style={nav_style}>
            {/* <!-- Image Logo --> */}
            <Link className="navbar-brand page-scroll" to="/">
                <img src={Logo} alt="Logo" height="40" />
            </Link>
            {/* <!-- Mobile Menu Toggle Button --> */}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-awesome fas fa-bars"></span>
                <span className="navbar-toggler-awesome fas fa-times"></span>
            </button>
            {/* <!-- end of mobile menu toggle button --> */}
            
            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link page-scroll" to="/">HOME <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link page-scroll" to="/SignUp">SignUp</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link page-scroll" to="/Signin">SignIn</Link>
                    </li>
                </ul>
            </div>
        </nav>

    )
}

export default Navbar;