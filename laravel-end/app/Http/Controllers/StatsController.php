<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Goal;
use App\Models\Progress;

class StatsController extends Controller
{
    public function getStats()
    {
    
      
        $userId = auth()->id(); 
        $goals = Goal::where('user_id', $userId)->get();

        $stats = $goals->map(function ($goal) {
           
            $progressData = Progress::where('goal_id', $goal->id)
                ->selectRaw('DATE(created_at) as date, SUM(progress_duration) as duration')
                ->groupBy('date')
                ->get()
                ->toArray();

            return [
                'name' => $goal->title,
                'details' => $progressData,
             
            ];
        });

        return response()->json(['stats' => $stats], 200);
    }
}
