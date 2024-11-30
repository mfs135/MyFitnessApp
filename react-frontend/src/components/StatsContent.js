import React, { useState, useEffect } from "react";
import StatsGraph from "./StatsGraph";
import AuthUser from "../components/AuthUser";

function StatsContent() {
    const { http } = AuthUser(); // For API communication
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    // Fetch stats from the backend
    const fetchStats = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await http.get("/stats"); // Call the /stats API endpoint
            setStats(response.data.stats);
        } catch (err) {
            console.error("Error fetching stats:", err);
            setError("Failed to load stats. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats(); // Fetch stats on component mount
    }, []);

    if (loading) return <div data-testid="loadingID">Loading...</div>;

    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="space-y-6 p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Exercise Statistics</h2>
            <div className="flex flex-col gap-6">
                {stats.map((exercise, index) => (
                    <div key={index} className="bg-white p-4 shadow-md rounded-lg w-full">
                        <h4 className="text-lg font-semibold mb-4">{exercise.name}</h4>
                        <div className="w-full overflow-x-auto">
                            <StatsGraph data={exercise.details} exerciseName={exercise.name} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StatsContent;