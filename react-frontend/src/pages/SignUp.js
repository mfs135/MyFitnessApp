import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AuthUser from "../components/AuthUser";
import { useNavigate } from "react-router-dom";

function SignUp() {

    const sectionstyle = {
        backgroundColor: '',
    }

    const cardstyle = {
        borderRadius: '',
    }

    const navigate = useNavigate();
    const {http} = AuthUser();
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setconfirm] = useState('');
    const [name, setname] = useState('');
    const [loading , setloading] = useState(false);
    const [error , seterror] = useState('');

    const sanitizeInput = (input) => {
        // Basic XSS prevention
        return input.replace(/[<>]/g, '');
    };

    const registerform = async (e) => {
        e.preventDefault();
        seterror("");
        setloading(true);

        // Basic validation
        if (!email || !password || !confirm || !name) {
            seterror("Please fill in all fields");
            setloading(false);
            return;
        }

        // password and confirm password should match

        if(password.length < 6){
            seterror('Password Length should be 6 or more!');
            setloading(false);
            return;
        }

        if (password !== confirm){
            seterror("Password did not match with confirm password.");
            setloading(false);
            return;
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            seterror("Please enter a valid email address");
            setloading(false);
            return;
        }

        const sanitized_email = sanitizeInput(email);

        try {
            console.log('Attempting SignUp with:', { sanitized_email });
            
            const response = await http.post('/register', {
                name: name,
                email: sanitized_email,
                password: password
            });

            console.log('SignUp response:', response.data);

            if (response.data.message === "successful"){
                navigate('/Signin');
            }
            else{
                seterror("Error occured by Backend in response!!");
                console.error('Error by Backend:' , {
                    response: response.data
                });
            }
        } catch (err) {
            console.error('Login error details:', {
                response: err.response?.data,
                status: err.response?.status,
                headers: err.response?.headers
            });
            seterror(err.response?.data?.message || 'An error occurred during login');
        } finally {
            setloading(false);
        }
       
    }

    //Clear on unmount.
    useEffect(() => {
        return () => {
            setemail('');
            setPassword('');
            setconfirm('');
            setname('');
        };
    }, []);

    return(
        <div>
            <Navbar />
            <section className="vh-100" style={sectionstyle}>
                <div className="container h-80">
                    <div className="row d-flex justify-content-center align-items-center h-50">
                        <div className="col-lg-11 ">
                            <div className="text-black" style={cardstyle}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-1">Sign up</p>
                                                {error && (
                                                <div className="alert alert-danger" role="alert">
                                                    {error}
                                                </div>
                                                )}
                                            <form className="mx-1 mx-md-4" onSubmit={registerform}>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="text"
                                                            id="form3Example1c"
                                                            className="form-control"
                                                            onChange={e => setname(e.target.value)}
                                                            required
                                                        />
                                                        <label className="form-label">Your Name</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="email"
                                                            id="form3Example3c"
                                                            className="form-control"
                                                            onChange={e => setemail(e.target.value)}
                                                            required
                                                        />
                                                        <label className="form-label">Your Email</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="password"
                                                            id="form3Example4c"
                                                            className="form-control"
                                                            onChange={e => setPassword(e.target.value)}
                                                            required
                                                        />
                                                        <label className="form-label">Password</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="password"
                                                            id="form3Example4cd"
                                                            className="form-control"
                                                            onChange={e => setconfirm(e.target.value)}
                                                            required
                                                        />
                                                        <label className="form-label" >Repeat your password</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button  type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg" disabled={loading}>
                                                        {loading ? 'Signing Up...' : 'Register'}
                                                    </button>
                                                </div>

                                            </form>

                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2 mb-5">

                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="img-fluid" alt="Sample" />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SignUp;