<?php

namespace Tests\Feature;

use App\Models\Goal;
use App\Models\Progress;
use App\Models\User;
use Tests\TestCase;

class GoalControllerTest extends TestCase
{
    //Test if auth user can get all goals data.
    public function test_user_can_get_all_goals()
    {
        // Create a user and authenticate
        $user = User::factory()->create();
        $this->actingAs($user);

        // Create goals for the user
        $goal1 = Goal::factory()->create(['user_id' => $user->id]);
        $goal2 = Goal::factory()->create(['user_id' => $user->id]);

        // Add progress for the goals
        Progress::create(['goal_id' => $goal1->id, 'progress_duration' => 10]);
        Progress::create(['goal_id' => $goal2->id, 'progress_duration' => 20]);

        // Send a GET request to the index endpoint
        $response = $this->getJson(route('all-goals-data'));

        // Assert the response status and the structure of the returned data
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'goals' => [
                '*' => [
                    'id', 'title', 'target_duration', 'progress', 'daily_progress', 'cumulative_progress',
                ],
            ],
        ]);
    }
    // Test to check whether auth user can update goal progress properly.
    public function test_user_can_update_goal_progress()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        // Create a goal for the user
        $goal = Goal::factory()->create(['user_id' => $user->id]);

        // Add initial progress
        Progress::create(['goal_id' => $goal->id, 'progress_duration' => 0]);

        // Data to update the progress
        $updateData = ['progress' => 30];

        // Send a PUT request to update the progress
        $response = $this->putJson(route('update_goals', ['id' => $goal->id]), $updateData);

        // Assert the response status and the correct data is returned
        $response->assertStatus(200);
        $response->assertJsonFragment(['progress' => "30"]);

        // Check if the progress was updated in the database
        $this->assertDatabaseHas('progress', [
            'goal_id' => $goal->id,
            'progress_duration' => 30,
        ]);
    }

    //Test if auth user can delete the goal.
    public function test_user_can_delete_goal()
    {
        $user = User::factory()->create();
        $this->actingAs($user);
    
        // Create a dummy goal for the user
        $goal = Goal::factory()->create(['user_id' => $user->id]);
    
        // Send a DELETE request to delete the goal
        $response = $this->deleteJson(route('delete_goal', ['id' => $goal->id]));
    
        // Assert the response status
        $response->assertStatus(200);
        $response->assertJson(['message' => 'Goal deleted successfully']);
    
        // Check if the goal is deleted from the database
        $this->assertDatabaseMissing('goals', ['id' => $goal->id]);
    }
    
    //Test if user can create goal.
    public function test_user_can_create_goal()
    {
        $user = User::factory()->create();
        
        //Act as the Created User is Authenticated.
        $this->actingAs($user);
    
        $goalData = [
            'title' => 'New Goal',
            'target_duration' => 100,
        ];
    
        // Send a POST request to create a new goal
        $response = $this->postJson(route('create_goal'), $goalData);
    
        // Assert the response status and the structure of the returned data
        $response->assertStatus(201);
        $response->assertJson([
            'goal' => [
                'title' => $goalData['title'],
                'target_duration' => $goalData['target_duration'],
            ],
        ]);
    
        // Check if the goal is actually stored in the database
        $this->assertDatabaseHas('goals', [
            'title' => $goalData['title'],
            'user_id' => $user->id,
        ]);
    }
    

}
