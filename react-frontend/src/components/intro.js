import { Link } from "react-router-dom";
import Fitness_img from "../assets/Fitness Tracking.jpg";

function intro(){

    const img_styles = {width: '100%' , height: 'auto' , display: 'block' , transition: 'transform 0.3s ease-in-out' 
    }

    return (
    <div id="intro" className="basic-1">
        <div className="container">
            <div className="row">
                <div className="col-lg-5">
                    <div className="text-container">
                        <div className="section-title">INTRO</div>
                        <h2>Set Goals.Log Workouts.Stay on Track.</h2>
                        <p>Easily Track your workout, set training plans and discover new Workout Routines to crush your goals.</p>
                        <Link to="/SignUp" className="btn-solid-lg page-scroll">Get Started</Link>
                    </div> 
                </div>
                <div className="col-lg-7">
                    <div className="image-container" style={{
                                position: 'relative',
                                overflow: 'hidden',
                                borderRadius: '35px',
                                boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)'
                            }}>
                        <img className="img-fluid" src={Fitness_img} alt="alternative" style={img_styles} />
                    </div> 
                </div> 
            </div> 
        </div> 
       
    </div> 
    
    )
}

export default intro