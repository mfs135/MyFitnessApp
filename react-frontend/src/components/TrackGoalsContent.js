import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar.js";
import Form from "./Form.js";
import AuthUser from "../components/AuthUser";

function TrackGoalsContent() {
    const { http } = AuthUser();
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedGoal, setSelectedGoal] = useState(null);

    const fetchGoals = async () => {
        try {
            setError(null);
            setLoading(true);
            
            const response = await http.get("/goals");
            setGoals(response.data.goals);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch goals");
            console.error("Error fetching goals:", err);
            
        } finally {
            setLoading(false);
        }
    };

    const handleAddGoal = async (newGoal) => {
        try {
            const response = await http.post("/goals", newGoal); 
            setGoals((prevGoals) => [...prevGoals, response.data.goal]);
        } catch (err) {
            console.error("Error adding goal:", err);
            setError("Failed to add goal. Please try again.");
        }
    };

    const handleEditGoal = async (updatedGoal) => {
        try {
            const response = await http.put(`/goals/${updatedGoal.id}`, updatedGoal); 
          
            const updatedGoals = goals.map(goal => 
                goal.id === updatedGoal.id ? { ...goal, ...response.data.goal } : goal
            );
            setGoals(updatedGoals);
            setSelectedGoal(null);
            window.location.reload();
        } catch (err) {
            console.error("Error updating progress:", err);
            setError("Failed to update progress. Please try again.");
        }
    };

    const deleteGoal = async (id) => {
        try {
            await http.delete(`/goals/${id}`);
            setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
        } catch (err) {
            console.error("Error deleting goal:", err);
            setError("Failed to delete goal. Please try again.");
        }
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Track Your Goals</h2>
            <br></br>
            <br></br>
            <div className="d-flex justify-content-center mb-5">
                <Form type="AddGoal" onSubmit={handleAddGoal} modalId="addGoalModal" />
            </div>

            {goals.length > 0 ? (
                goals.map((goal) => (
                    <div key={goal.id} className="mb-5">
                        <div className="d-flex justify-content-end align-items-center mb-2">
                            <button
                                className="btn btn-primary btn-sm me-2"
                                data-bs-toggle="modal"
                                data-bs-target="#editGoalModal"
                                onClick={() => setSelectedGoal(goal)}
                            >
                                Update Progress
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteGoal(goal.id)}
                            >
                                Delete
                            </button>
                            <Form
                                type="EditGoal"
                                onSubmit={handleEditGoal}
                                goal={selectedGoal}
                                modalId="editGoalModal"
                            />
                        </div>
                        <ProgressBar
                            ProgressName={goal.title}
                            ProgressVal={(goal.daily_progress / goal.target_duration) * 100 || 0}
                            Progresslocation="TrackGoals"
                        />
                        <p>
                            {goal.daily_progress}/{goal.target_duration} mins completed
                        </p>
                    </div>
                ))
            ) : (
                <div>No goals available. Add one to get started!</div>
            )}
        </>
    );
}

export default TrackGoalsContent;