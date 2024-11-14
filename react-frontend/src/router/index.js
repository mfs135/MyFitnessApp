import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.js";
import Signin from "../pages/Signin.js"
import SignUp from "../pages/SignUp.js";
import Dashboard from "../pages/Dashboard.js";

function MyRouter(){
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/Signin" element={<Signin />}/>
            <Route path="/SignUp" element={<SignUp />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
    )

}

export default MyRouter;