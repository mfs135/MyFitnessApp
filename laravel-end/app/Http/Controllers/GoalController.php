<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use App\Models\Progress;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

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
        
        // Calculate overall progress and daily progress
        $totalProgress = 0;
        $dailyProgress = 0;
        
        foreach ($goals as $goal) {
            // Cumulative progress for the goal
            $goalProgress = Progress::where('goal_id', $goal->id)->sum('progress_duration');
            
            // Daily progress for the goal (progress for today)
            $goalDailyProgress = Progress::where('goal_id', $goal->id)
                ->whereDate('created_at', Carbon::today()) 
                ->sum('progress_duration');
            
            // Check if the goal is completed
            if ($goalDailyProgress >= $goal->target_duration) {
                $completedGoals++;
                $achievedGoals[] = [
                    'title' => $goal->title,
                    'duration' => $goalProgress,
                    'daily_progress' => $goalDailyProgress, // Include daily progress for achieved goals
                ];
            } else {
                $pendingGoals[] = [
                    'title' => $goal->title,
                    'daily_progress' => $goalDailyProgress, // Include daily progress for pending goals
                ];
            }
    
            // Add the cumulative progress and daily progress to total
            $totalProgress += $goalProgress;
            $dailyProgress += $goalDailyProgress;
        }
    
        // Calculate percentage of overall progress
        $progress = ($totalGoals > 0) ? ($completedGoals / $totalGoals) * 100 : 0;
    
        // Return all data in a single response
        return response()->json([
            'progress' => $progress,
            'total_progress' => $totalProgress,
            'daily_progress' => $dailyProgress, // Include daily progress in the response
            'achieved_goals' => $achievedGoals,
            'pending_goals' => $pendingGoals,
        ]);
    }
    

    public function index(Request $request)
    {
        $goals = Goal::where('user_id', $request->user()->id)
            ->with('progress') 
            ->get()
            ->map(function ($goal) {
                $totalProgress = Progress::where('goal_id', $goal->id)->sum('progress_duration'); // Sum all progress entries
                $dailyProgress = Progress::where('goal_id', $goal->id)
                    ->whereDate('created_at', Carbon::today()) // Fetch today's progress only
                    ->sum('progress_duration');
                    
                return [
                    'id' => $goal->id,
                    'title' => $goal->title,
                    'target_duration' => $goal->target_duration,
                    'progress' => $totalProgress, // Cumulative progress for the goal
                    'daily_progress' => $dailyProgress, // Today's progress for the goal
                    'cumulative_progress' => $totalProgress, // Cumulative progress
                ];
            });
            Log::info('goal', ['goal' => $goals]);
    

        return response()->json(['goals' => $goals]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'target_duration' => 'required|integer|min:1',
        ]);
    
        // Create new goal
        $goal = Goal::create([
            'user_id' => $request->user()->id,
            'title' => $validated['title'],
            'target_duration' => $validated['target_duration'],
            'start_date' => now(),
        ]);
    
        // Initialize progress for the goal with 0 duration
        Progress::create([
            'goal_id' => $goal->id,
            'progress_duration' => 0, 
        ]);
    
        return response()->json(['goal' => $goal], 201);
    }

    public function update(Request $request)
    {
        $goal = Goal::find($request->id);

        if (!$goal) {
            return response()->json(['message' => 'Goal not found'], 404);
        }

        // Check if a new day started and reset daily progress if needed
        $today = Carbon::today();
        $lastProgress = Progress::where('goal_id', $goal->id)
            ->whereDate('created_at', $today)
            ->first();
        
        if (!$lastProgress) {
            // If no progress exists for today, reset the daily progress to 0
            Progress::create([
                'goal_id' => $goal->id,
                'progress_duration' => 0, 
            ]);
        }

        // Add new progress entry for today
        $progress = Progress::create([
            'goal_id' => $goal->id,
            'progress_duration' => $request->progress,
        ]);

        // Calculate cumulative progress by summing all progress durations
        $cumulativeProgress = $goal->progress()->sum('progress_duration');

        return response()->json([
            'goal' => $goal,
            'progress' => $cumulativeProgress,
            'message' => 'Progress updated successfully',
        ], 200);
    }

    public function destroy(Request $request, $id)
    {
        $goal = Goal::where('user_id', $request->user()->id)->findOrFail($id);

        $goal->delete();

        return response()->json(['message' => 'Goal deleted successfully'], 200);
    }

    // Method to reset daily progress at the start of each day
    public function resetDailyProgress()
    {
        $today = Carbon::today();
        $goals = Goal::all();

        foreach ($goals as $goal) {
            // Reset daily progress to 0 for each goal at the start of the new day
            Progress::create([
                'goal_id' => $goal->id,
                'progress_duration' => 0, 
            ]);
        }

        return response()->json(['message' => 'Daily progress reset successfully'], 200);
    }
}
