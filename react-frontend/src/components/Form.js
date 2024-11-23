import React, { useState, useEffect } from "react";

function Form({ type, onSubmit, goal, modalId }) {
    const [goalName, setGoalName] = useState("");
    const [duration, setDuration] = useState("");
    const [progress, setProgress] = useState("");

    // Pre-fill form for editing or reset when no goal is selected
    useEffect(() => {
        if (type === "EditGoal" && goal) {
            setGoalName(goal.title || "");
            setDuration(goal.target_duration || "");
            setProgress(goal.progress || "");
        } else if (type === "EditGoal" && !goal) {
            setGoalName("");
            setDuration("");
            setProgress("");
        }
    }, [type, goal]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === "AddGoal") {
            if (!goalName || !duration) {
                alert("Please fill in all fields");
                return;
            }
            onSubmit({
                title: goalName,
                target_duration: parseInt(duration, 10),
            });
            setGoalName("");
            setDuration("");
        } else if (type === "EditGoal") {
            if (!progress) {
                alert("Please fill in the progress field.");
                return;
            }
            onSubmit({
                id: goal.id, 
                title: goalName,
                target_duration: parseInt(duration, 10),
                progress: parseInt(progress, 10),
            });
        }
    };

    const renderForm = () => {
        if (type === "AddGoal") {
            return (
                <div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target={`#${modalId}`}
                    >
                        Add New Goal
                    </button>
                    <div
                        className="modal fade"
                        id={modalId}
                        tabIndex="-1"
                        aria-labelledby="AddGoalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="AddGoalLabel">
                                        Add Goal
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="col-form-label">
                                                Goal Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={goalName}
                                                onChange={(e) => setGoalName(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="col-form-label">
                                                Duration
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={duration}
                                                onChange={(e) => setDuration(e.target.value)}
                                            />
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                data-bs-dismiss="modal"
                                            >
                                                Close
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn btn-success"
                                            >
                                                Add Goal
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (type === "EditGoal") {
            return (
                <div>
                    <div
                        className="modal fade"
                        id={modalId}
                        tabIndex="-1"
                        aria-labelledby="EditGoalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="EditGoalLabel">
                                        Edit Goal
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="col-form-label">
                                                Goal Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={goalName}
                                                onChange={(e) => setGoalName(e.target.value)}
                                                readOnly={type === "EditGoal"}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="col-form-label">
                                                Target Duration
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={duration}
                                                onChange={(e) => setDuration(e.target.value)}
                                                readOnly={type === "EditGoal"}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="col-form-label">
                                                Progress
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={progress}
                                                onChange={(e) => setProgress(e.target.value)}
                                            />
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                data-bs-dismiss="modal"
                                            >
                                                Close
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn btn-success"
                                            >
                                                Update Goal
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return <>{renderForm()}</>;
}

export default Form;
