import React from "react";

function Form({type}){

    const renderform = (type) => {
        if( type === 'AddGoal'){
            return (
                <div>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#AddGoal">Add New Goal</button>
                    <div className="modal fade" id="AddGoal" tabIndex="-1" aria-labelledby="AddGoalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="AddGoalLabel">Add Goal</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label className="col-form-label">Goal Name</label>
                                            <input type="text" className="form-control" id="recipient-name" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="col-form-label">Duration</label>
                                            <textarea className="form-control" id="message-text"></textarea>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-success">Add Goal</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return null;
        }
    }

    return (
        <>
            {renderform(type)}
        </>
    )
}

export default Form;