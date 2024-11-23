import React, { useEffect, useState } from "react";
import '../css/ProgressBar.css';

function ProgressBar({ ProgressName, ProgressVal }) {
    const [width, setWidth] = useState(0);
    

    useEffect(() => {
        setTimeout(() => {
            setWidth(ProgressVal);
        }, 100);
    }, [ProgressVal]);

    const getProgressColor = () => {
        if (width >= 80) return '#22c55e';      // Vibrant Green
        if (width >= 60) return '#3b82f6';      // Royal Blue
        if (width >= 40) return '#f59e0b';      // Amber
        if (width >= 20) return '#f97316';      // Orange
        return '#ef4444';                       // Red
    };

    // Dynamic position calculation
    const getTextPosition = () => {
        if (width > 100) {
            const position = (50 / width) * 100;  // This calculates the correct percentage
            return {
                position: 'absolute',
                left: `${position}%`,
                transform: 'translateX(-50%)'
            };
        }
        return {}; // Default positioning for <= 100%
    };

    return (
        <div className="progress-container">
            <div className="progress-header">
                <h4>{ProgressName}</h4>
            </div>
            <div className="progress-wrapper">
                <div className="progress-bar-container">
                    <div
                        className="progress-bar"
                        style={{ 
                            width: `${width}%`,
                            backgroundColor: getProgressColor()
                        }}
                    >
                        <span 
                            className="progress-value"
                            style={getTextPosition()}
                        >
                            {ProgressVal}%
                        </span>
                        <div className="progress-glow" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProgressBar;