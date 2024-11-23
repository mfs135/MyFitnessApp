import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Helper function to generate a consistent color for each exercise
const generateColor = (name) => {
  const hash = name
    .split('')
    .reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  const hue = Math.abs(hash) % 360; // Ensure hue is between 0-359
  return `hsl(${hue}, 70%, 50%)`; // Dynamic HSL color
};

const StatsGraph = ({ data, exerciseName }) => {
  const barColor = generateColor(exerciseName); // Generate color based on exercise name

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
