import React from "react";

function ProgressBar({ProgressName,ProgressVal,Progresslocation = ''}){

    const Progress = ProgressName;
    const ProgressValue = ProgressVal;
    const location = Progresslocation;

    const renderdetails = () => {
        if (location !== 'dashboard'){
            return (
                <div>
                    <button className="btn btn-primary btn-sm me-2">Update Progress</button>
                    <button className="btn btn-danger btn-sm">Delete Goal</button>
                </div>
            )
        }
        else{
            return null;
        }
    };


    return (
        <>
            <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="m-0">{Progress}</h4>
                    {renderdetails()}
                </div>
            </div>
            <div className="progress" style={{ height: "40px", boxShadow: "0 0 20px rgba(0, 123, 255, 0.5)" }}>
                <div 
                    className="progress-bar bg-primary" 
                    role="progressbar" 
                    style={{ width: `${ProgressValue}%` }}
                    aria-valuenow={ProgressValue} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                >
                    {ProgressValue}%
                </div>
            </div>
        </>
    )
}

export default ProgressBar;