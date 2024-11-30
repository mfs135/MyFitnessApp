<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use App\Models\User;
use App\Models\Goal;
use App\Models\Progress;

class StatsApiTest extends TestCase
{
    use DatabaseTransactions;

    public function test_fetch_stats_for_authenticated_user()
    {
        // Create a test user
        $user = User::factory()->create();

        // Create test goals for the user
        $goals = Goal::factory()->count(2)->create(['user_id' => $user->id]);

        // Create progress data for the goals
        foreach ($goals as $goal) {
            Progress::factory()->count(1)->create([
                'goal_id' => $goal->id,
                'progress_duration' => 3, // e.g., 30 minutes
            ]);
        }

        // Authenticate the user
        $this->actingAs($user);

        // Call the /stats endpoint
        $response = $this->getJson('/api/stats');

        // Assert the response status
        $response->assertStatus(200);

        // Assert the structure of the JSON response
        $response->assertJsonStructure([
            'stats' => [
                '*' => [
                    'name',
                    'details' => [
                        '*' => [
                            'date',
                            'duration',
                        ],
                    ],
                ],
            ],
        ]);

        // Assert the data returned is correct
        $response->assertJsonCount(2, 'stats'); // Two goals
        $response->assertJsonFragment(['name' => $goals[0]->title]);
    }

    public function test_fetch_stats_with_no_goals()
    {
        // Create a test user
        $user = User::factory()->create();

        // Authenticate the user
        $this->actingAs($user);

        // Call the /stats endpoint
        $response = $this->getJson('/api/stats');

        // Assert the response status
        $response->assertStatus(200);

        // Assert the stats array is empty
        $response->assertJson(['stats' => []]);
    }

    public function test_fetch_stats_unauthenticated()
    {
        // Call the /stats endpoint without authentication
        $response = $this->getJson('/api/stats');

        // Assert the response status is 401 Unauthorized
        $response->assertStatus(401);
    }
}
