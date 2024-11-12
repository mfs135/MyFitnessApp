import React from "react";
import { Link } from "react-router-dom";

function Banner(){
    return (
        <header id="header" className="header">
            <div className="header-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-container">
                                <h1>REACH YOUR BEST</h1>
                                <p className=" p-heading p-large mb-4">Whether you're training for a marathon or your biggest season yet, we're here to help you make serious progress.</p>
                                <Link to="/SignUp" className="btn-solid-lg page-scroll">Sign Up</Link>
                                <p className="p-heading p-large text-white mt-3">Already a member? <Link to="/Signin" className="text-white">Log In</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </header>
    )
}

export default Banner;