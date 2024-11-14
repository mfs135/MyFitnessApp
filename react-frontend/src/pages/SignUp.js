
import React, { useState } from "react"
import Navbar from "../components/Navbar"
import { Input  , Ripple , initMDB, Tab } from "mdb-ui-kit"
import AuthUser from "../components/AuthUser";


function SignUp(){

    initMDB({Input , Ripple ,Tab});
    const {http} = AuthUser();
    const [email , setemail] = useState();
    const [password , setpassword] = useState();

    const submitform = () => {
        console.log(email + ' ' + password)
        http.post('/login',{email:email,password:password})
        .then((res) => {
            console.log(res.data);
        })
    }

    return (
    <div>
        <Navbar />
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                        className="img-fluid" alt="Phone" />
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <form>  
                            <div data-mdb-input-init className="form-outline mb-4">
                                <input type="email" id="form1Example13" className="form-control form-control-lg" onChange={e => setemail(e.target.value)}/>
                                <label className="form-label">Email address</label>
                            </div>

                            
                            <div data-mdb-input-init className="form-outline mb-4">
                                <input type="password" id="form1Example23" className="form-control form-control-lg" onChange={e => setpassword(e.target.value)}/>
                                <label className="form-label" >Password</label>
                            </div>
                            
                            <button type="button" className="btn btn-primary btn-lg btn-block" onClick={submitform}>Sign in</button>

                        </form>
                    </div>
                </div>
            </div>
        </section>

    </div>


    )

}

export default SignUp