import React, { act, useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import AuthUser from "../components/AuthUser";
import { Clock, CheckCircle, Circle, ChevronRight, LucideAlarmClockCheck } from 'lucide-react';

import '../css/DashboardContent.css';

function DashboardContent() {
    const { http } = AuthUser();
    const [goalData, setGoalData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchGoalData = async () => {
        try {
            setError(null);
            const response = await http.get('/all-goal-data');
            setGoalData(response.data);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to fetch goal data');
            console.error('Error fetching goal data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGoalData();
    }, []);

    if (loading) {
        return (
            <div className="loading-container" data-testid="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-message">
                {error}
            </div>
        );
    }

    return (
        
        
        <div className="dashboard-container">
            <div className="progress-section">
                <ProgressBar 
                    ProgressName="Overall Progress" 
                    ProgressVal={goalData.progress} 
                    Progresslocation="dashboard" 
                />
            </div>

            <div className="cards-grid">
                <div className="goal-card achieved">
                    <div className="card-header">
                        <h5>Achieved Goals</h5>
                        <LucideAlarmClockCheck className="header-icon" />
                    </div>
                    <div className="card-content">
                        {goalData.achieved_goals.length > 0 ? (
                            <div className="goals-list">
                                
                                {goalData.achieved_goals.map((goal, index) => (
                                    <div key={index} className="goal-item">
                                        <CheckCircle className="goal-icon" />
                                        <span className="goal-title">{goal.title}</span>
                                        <span className="goal-time">{goal.daily_progress} mins</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="no-goals">No achieved goals</p>
                        )}
                    </div>
                </div>

                <div className="goal-card pending">
                    <div className="card-header">
                        <h5>Pending Goals</h5>
                        <Clock className="header-icon" />
                    </div>
                    <div className="card-content">
                        {goalData.pending_goals.length > 0 ? (
                            <div className="goals-list">
                                {goalData.pending_goals.map((goal, index) => (
                                    <div key={index} className="goal-item2">
                                        <Circle className="goal-icon" />
                                        <span className="goal-title">{goal.title}</span>
                                        <ChevronRight className="chevron-icon" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="no-goals">No pending goals</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardContent;