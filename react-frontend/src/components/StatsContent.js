import React from "react";
import StatsGraph from "./StatsGraph";

function StatsContent(){

    //Sample Data.
    const data = [
        {
            name: 'Push Ups' , 
            details : [
                { date: '5 nov' , duration: 6},
                {date: '6 nov' , duration: 10},
                {date: '7 nov' , duration: 50}
            ]
        },
        {
            name: 'BenchPress' ,
            details : [
                { date: '5 nov' , duration: 2},
                {date: '6 nov' , duration: 70},
                {date: '7 nov' , duration: 30}
            ]
        },
        {
            name: 'Pull Ups' , 
            details : [
                { date: '5 nov' , duration: 20},
                {date: '6 nov' , duration: 140},
                {date: '7 nov' , duration: 40}
            ]
        }
    ];
    
    return (
        <>
            <div className="space-y-6 p-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Exercise Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((exercise, index) => (
                        <div key={index}>
                            <h4 className="m-0">{exercise.name}</h4>
                            <StatsGraph data={exercise.details} exerciseName={exercise.name}/>                
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default StatsContent;