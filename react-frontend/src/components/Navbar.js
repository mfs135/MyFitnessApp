import { Link } from "react-router-dom";
import React from "react";
import { useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();
    let nav_style = {};
    let nav_class_properties = '';

    if (location.pathname === '/') {
        nav_style = {};
        nav_class_properties = 'navbar navbar-expand-md navbar-dark navbar-custom fixed-top';
    } else {
        nav_style = {
            backgroundColor: 'rgb(19 80 115)'
        };
        nav_class_properties = 'navbar navbar-expand-md navbar-dark navbar-custom top-nav-collapse';
    }

    return (
        <nav className={nav_class_properties} style={nav_style}>
            <Link className="navbar-brand page-scroll" to="/">
                <span style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: 'black',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.3s ease',
                    display: 'inline-block'
                }}
                onMouseOver={e => {
                    e.target.style.color = '#FFFFFF';
                    e.target.style.textShadow = '4px 4px 8px rgba(0, 0, 0, 0.5)';
                    e.target.style.transform = 'scale(1.1)';
                }}
                onMouseOut={e => {
                    e.target.style.color = 'black';
                    e.target.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.3)';
                    e.target.style.transform = 'scale(1)';
                }}>
                    FitLogix
                </span>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-awesome fas fa-bars"></span>
                <span className="navbar-toggler-awesome fas fa-times"></span>
            </button>
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
    );
}

export default Navbar;
