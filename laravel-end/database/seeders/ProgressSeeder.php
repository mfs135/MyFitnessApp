<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Progress;

class ProgressSeeder extends Seeder
{
    public function run()
    {
     
        Progress::create([
            'goal_id' =>2, 
            'progress_duration' => 20, 
        ]);

        Progress::create([
            'goal_id' => 2,
            'progress_duration' => 30, 
        ]);

        Progress::create([
            'goal_id' => 3,
            'progress_duration' => 50, 
        ]);

        Progress::create([
            'goal_id' => 4, 
            'progress_duration' => 10, 
        ]);
      
    }
}
