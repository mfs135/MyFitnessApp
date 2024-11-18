import React from "react";
import ProgressBar from "./ProgressBar";

function DashboardContent(){

    // Sample data
    const overallProgress = 8;
    const achievedGoals = [
        { title: "Workout for 30 min", duration: "5 min" },
        { title: "Meditate for 5 min", duration: "5 min" }
    ];
    const pendingGoals = [
        { title: "Do sit-stands for 1 hour" },
        { title: "Evening walk" },
        { title: "Read a book" }
    ];
    
    return (
        <div>
            {/* Overall Progress */}
            <div className="mb-5">
                <ProgressBar ProgressName={"Overall Progress"} ProgressVal={overallProgress} Progresslocation="dashboard"/>
            </div>

            {/* Achieved and Pending Goals */}
            <div className="row">
                <div className="col-md-6 mb-4">
                <div className="card">
                    <div className="card-header">
                    <h5 className="card-title mb-0">Achieved Goals</h5>
                    </div>
                    <div className="card-body">
                        {achievedGoals.map((goal, index) => (
                            <div key={index} className="card mb-2">
                                <div className="card-body d-flex justify-content-between align-items-center py-2">
                                    <span>{goal.title}</span>
                                    <small className="text-muted">{goal.duration}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
                <div className="col-md-6 mb-4">
                <div className="card">
                    <div className="card-header">
                    <h5 className="card-title mb-0">Pending Goals</h5>
                    </div>
                    <div className="card-body">
                    {pendingGoals.map((goal, index) => (
                        <div key={index} className="card mb-2">
                        <div className="card-body py-2">
                            {goal.title}
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardContent;