import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import AuthUser from "../components/AuthUser";

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
            <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
        );
    }

    return (
        <div>
            <div className="mb-5">
                <ProgressBar 
                    ProgressName="Overall Progress" 
                    ProgressVal={goalData.progress} 
                    Progresslocation="dashboard" 
                />
            </div>

            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title mb-0">Achieved Goals</h5>
                        </div>
                        <div className="card-body">
                            {goalData.achieved_goals.length > 0 ? (
                                goalData.achieved_goals.map((goal, index) => (
                                    <div key={index}>{goal.title} - {goal.duration} hours</div>
                                ))
                            ) : (
                                <p>No achieved goals</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title mb-0">Pending Goals</h5>
                        </div>
                        <div className="card-body">
                            {goalData.pending_goals.length > 0 ? (
                                goalData.pending_goals.map((goal, index) => (
                                    <div key={index}>{goal.title}</div>
                                ))
                            ) : (
                                <p>No pending goals</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardContent;
