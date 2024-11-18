import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const StatsGraph = ({ data,exerciseName }) => {

    // Define colors for each exercise type
    const exerciseColors = {
        'Push Ups': '#4f46e5', // Indigo
        'BenchPress': '#e11d48', // Rose
        'Pull Ups': '#059669', // Emerald
        // Add more exercise colors here as needed
    };

    const barColor = exerciseColors[exerciseName] || '#818cf8';

  return (
    <BarChart width={600} height={400} data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="duration" fill={barColor} />
    </BarChart>
  );
};

export default StatsGraph;