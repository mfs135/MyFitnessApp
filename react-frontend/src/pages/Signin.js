
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Input, Ripple, initMDB, Tab } from "mdb-ui-kit";
import AuthUser from "../components/AuthUser";
import { useNavigate } from "react-router-dom";

function SignIn(){
    initMDB({ Input, Ripple, Tab });

    const navigate = useNavigate();
    const { http, settoken } = AuthUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const sanitizeInput = (input) => {
        // Basic XSS prevention
        return input.replace(/[<>]/g, '');
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Basic validation
        if (!email || !password) {
            setError("Please fill in all fields");
            setLoading(false);
            return;
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            setLoading(false);
            return;
        }

        const sanitized_email = sanitizeInput(email);

        try {
            console.log('Attempting login with:', { sanitized_email });
            
            const response = await http.post('/login', {
                email: sanitized_email,
                password: password
            });

            console.log('Login response:', response.data);

            if (response.data.access_token) {

                //lets store access_token in AuthUser, set store and get Token in AuthUser.
                settoken(response.data.user,response.data.access_token);

                console.log('Login successful, token stored');
                navigate('/dashboard');

                //token stored now redirect or storage of token in variables.


            } else {
                console.warn('No token in response:', response.data);
                setError('Invalid response from server');
            }
        } catch (err) {
            console.error('Login error details:', {
                response: err.response?.data,
                status: err.response?.status,
                headers: err.response?.headers
            });
            
            setError(err.response?.data?.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    // Clear sensitive data on unmount
    useEffect(() => {
        return () => {
            setPassword("");
            setEmail("");
        };
    }, []);

    return (
        <div>
            <Navbar />
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                className="img-fluid"
                                alt="Phone"
                            />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={submitForm}>
                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="form1Example13"
                                        className="form-control form-control-lg"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        required
                                    />
                                    <label className="form-label">Email address</label>
                                </div>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input
                                        type="password"
                                        id="form1Example23"
                                        className="form-control form-control-lg"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        required
                                    />
                                    <label className="form-label">Password</label>
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn btn-primary btn-lg btn-block"
                                    disabled={loading}
                                >
                                    {loading ? 'Signing in...' : 'Sign in'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SignIn