<?php

namespace App\Http\Controllers;

use App\Models\Goal; 
use App\Models\Progress; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\JWTGuard;
use Carbon\Carbon;


class GoalController extends Controller
{
    public function getAllGoalData(Request $request)
    {
        $user = $request->user(); // Get the authenticated user
        
        // Fetch all the goals for the user
        $goals = Goal::where('user_id', $user->id)->get();

        // Initialize counters for the progress
        $completedGoals = 0;
        $achievedGoals = [];
        $pendingGoals = [];
        
        $totalGoals = $goals->count();
        
        // Calculate overall progress
        $totalProgress = 0;
        foreach ($goals as $goal) {
            $goalProgress = Progress::where('goal_id', $goal->id)->sum('progress_duration');
            if ($goalProgress >= $goal->target_duration) {
                $completedGoals++;
                $achievedGoals[] = [
                    'title' => $goal->title,
                    'duration' => $goalProgress,
                ];
            } else {
                $pendingGoals[] = [
                    'title' => $goal->title,
                ];
            }
            $totalProgress += $goalProgress;
        }

        // Calculate percentage of overall progress
        $progress = ($totalGoals > 0) ? ($completedGoals / $totalGoals) * 100 : 0;

        // Return all data in a single response
        return response()->json([
            'progress' => $progress,
            'achieved_goals' => $achievedGoals,
            'pending_goals' => $pendingGoals,
        ]);
    }

    public function index(Request $request)
    {
        $goals = Goal::where('user_id', $request->user()->id)
            ->with('progress') // Eager load the progress relationship
            ->get()
            ->map(function ($goal) {
                $totalProgress = Progress::where('goal_id', $goal->id)->sum('progress_duration'); // Sum all progress entries
                return [
                    'id' => $goal->id,
                    'title' => $goal->title,
                    'target_duration' => $goal->target_duration,
                    'progress' => $totalProgress, // Total progress for the goal
                ];
            });
    
        return response()->json(['goals' => $goals]);
    }
    

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'target_duration' => 'required|integer|min:1',
        ]);
    
        
        $goal = Goal::create([
            'user_id' => $request->user()->id,
            'title' => $validated['title'],
            'target_duration' => $validated['target_duration'],
            'start_date' => now(),
        ]);
    
    
        Progress::create([
            'goal_id' => $goal->id,
            'progress_duration' => 0, 
        ]);
    
        return response()->json(['goal' => $goal], 201);
    }
    public function update(Request $request, $id)
    {
        // Validate only the progress input
        $validated = $request->validate([
            'progress' => 'required|integer|min:0',
        ]);
    
        // Find the goal by ID and ensure it belongs to the authenticated user
        $goal = Goal::where('user_id', $request->user()->id)->findOrFail($id);
    
        // Update the progress by adding the new progress
        $goal->progress += $validated['progress'];
        $goal->save();
    
        return response()->json([
            'goal' => $goal,
            'message' => 'Progress updated successfully',
        ], 200);
    }
    

    public function destroy(Request $request, $id)
    {
        $goal = Goal::where('user_id', $request->user()->id)->findOrFail($id);

        $goal->delete();

        return response()->json(['message' => 'Goal deleted successfully'], 200);
    }


    
}
