import React, { useEffect, useState } from "react";

function ProgressBar({ ProgressName, ProgressVal }) {
    const Progress = ProgressName;
    const ProgressValue = ProgressVal;

    const [width, setwidth] = useState(0);

    useEffect(() => {
        //As component mount start animation.
        setTimeout(() => {
            setwidth(ProgressValue);
        }, 100);
    }, [ProgressValue]);

    return (
        <>
            <div className="mb-3">
                <h4 className="m-0">{Progress}</h4>
            </div>
            <div
                className="progress"
                style={{ height: "40px", boxShadow: "0 0 20px rgba(0, 123, 255, 0.5)" }}
            >
                <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: `${width}%` }}
                    aria-valuenow={width}
                    aria-valuemin="0"
                    aria-valuemax="100"
                >
                    {ProgressValue}%
                </div>
            </div>
        </>
    );
}

export default ProgressBar;
