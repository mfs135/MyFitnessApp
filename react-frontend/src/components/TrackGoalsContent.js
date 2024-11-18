import React from "react";
import ProgressBar from "./ProgressBar.js";
import Form from "./Form.js";


function TrackGoalsContent(){

    const goals = [
        {title: "Push Ups" , Progress: "10"},
        {title: "Squats" , Progress: "50"},
        {title: "Pull Ups" , Progress: "40"}
    ];

    return (
        <>
            <div className="d-flex justify-content-center mb-5">
                <Form type={'AddGoal'}/>
            </div>

            {goals.map((goal,index) => (
                <div key={index} className="mb-5">
                    <ProgressBar ProgressName={goal.title} ProgressVal={goal.Progress} Progresslocation="TrackGoals"/>
                </div>
            ))}
        </>
    )
}

export default TrackGoalsContent;