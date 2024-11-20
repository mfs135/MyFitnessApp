<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Goal;
use Carbon\Carbon;

class GoalSeeder extends Seeder

{
    public function run()
    {
        Goal::create([
            'user_id' => 1,
            'title' => 'Push Ups',
            'target_duration' => 100,
            'start_date' => Carbon::now()->toDateString(),
        ]);

        Goal::create([
            'user_id' => 1,
            'title' => 'Squats',
            'target_duration' => 200,
            'start_date' => Carbon::now()->toDateString(), 
        ]);

        Goal::create([
            'user_id' => 1,
            'title' => 'Pull Ups',
            'target_duration' => 50,
            'start_date' => Carbon::now()->toDateString(), // Set start_date to today
        ]);
    }
}
