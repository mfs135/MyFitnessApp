import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar.js";
import Form from "./Form.js";
import AuthUser from "../components/AuthUser";

function TrackGoalsContent() {
    const { http } = AuthUser(); // AuthUser for API communication
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedGoal, setSelectedGoal] = useState(null);

    // Fetch goals from the backend
    const fetchGoals = async () => {
        try {
            setError(null);
            setLoading(true);
            const response = await http.get("/goals"); // GET /goals API
            setGoals(response.data.goals); // Set goals from API response
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch goals");
            console.error("Error fetching goals:", err);
        } finally {
            setLoading(false);
        }
    };

    // Add a new goal
    const handleAddGoal = async (newGoal) => {
        try {
            const response = await http.post("/goals", newGoal); // POST /goals API
            setGoals((prevGoals) => [...prevGoals, response.data.goal]); // Add new goal to state
        } catch (err) {
            console.error("Error adding goal:", err);
            setError("Failed to add goal. Please try again.");
        }
    };

    // Edit an existing goal
    const handleEditGoal = async (updatedGoal) => {
        try {
            const response = await http.put(`/goals/${updatedGoal.id}`, updatedGoal); // PUT /goals/:id
            setGoals((prevGoals) =>
                prevGoals.map((goal) =>
                    goal.id === updatedGoal.id ? { ...goal, ...response.data.goal } : goal
                )
            );
        } catch (err) {
            console.error("Error updating progress:", err);
            setError("Failed to update progress. Please try again.");
        }
    };

    // Delete a goal
    const deleteGoal = async (id) => {
        try {
            await http.delete(`/goals/${id}`); // DELETE /goals/{id} API
            setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
        } catch (err) {
            console.error("Error deleting goal:", err);
            setError("Failed to delete goal. Please try again.");
        }
    };

    // Reset selected goal when the modal is closed
    useEffect(() => {
        const handleModalClose = () => {
            setSelectedGoal(null); // Reset selected goal
        };

        const modalElement = document.getElementById("editGoalModal");
        if (modalElement) {
            modalElement.addEventListener("hidden.bs.modal", handleModalClose);
        }

        return () => {
            if (modalElement) {
                modalElement.removeEventListener("hidden.bs.modal", handleModalClose);
            }
        };
    }, []);

    // Fetch goals on component mount
    useEffect(() => {
        fetchGoals();
    }, []);

    // Loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Error state
    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <>
            {/* Add Goal Form */}
            <div className="d-flex justify-content-center mb-5">
                <Form type="AddGoal" onSubmit={handleAddGoal} modalId="addGoalModal" />
            </div>

            {/* Goals Progress Display */}
            {goals.length > 0 ? (
                goals.map((goal) => (
                    <div key={goal.id} className="mb-5">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <div className="d-flex">
                                <button
                                    className="btn btn-primary btn-sm me-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#editGoalModal"
                                    onClick={() => setSelectedGoal(goal)} // Set selected goal
                                >
                                    Update Progress
                                </button>
                                <Form
                                    type="EditGoal"
                                    onSubmit={handleEditGoal}
                                    goal={selectedGoal}
                                    modalId="editGoalModal"
                                />
                            </div>
                            <div>
                                <button
                                    className="btn btn-danger btn-sm ms-2"
                                    onClick={() => deleteGoal(goal.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <ProgressBar
                            ProgressName={goal.title}
                            ProgressVal={(goal.progress / goal.target_duration) * 100 || 0}
                            Progresslocation="TrackGoals"
                        />
                        <p>
                            {goal.progress}/{goal.target_duration} mins completed
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
