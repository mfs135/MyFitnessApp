<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use DatabaseTransactions;

    public function test_user_can_register_successfully()
    {
        $data = [
            'name' => 'John Doe',
            'email' => 'johndoe@example.com',
            'password' => 'password123',
        ];

        $response = $this->postJson('/api/register', $data);

        $response->assertStatus(202)
                 ->assertJson([
                     'status' => 202,
                     'message' => 'successful',
                 ]);

        $this->assertDatabaseHas('users', [
            'email' => 'johndoe@example.com',
        ]);
    }

    public function test_registration_fails_with_invalid_data()
    {
        $data = [
            'name' => '',
            'email' => 'not-an-email',
            'password' => 'short',
        ];

        $response = $this->postJson('/api/register', $data);

        $response->assertStatus(422)
                 ->assertJsonStructure(['status', 'message']);
    }

    public function test_user_can_login_successfully()
    {
        $user = User::factory()->create([
            'email' => 'johndoe@example.com',
            'password' => bcrypt('password123'),
        ]);
    
        $credentials = [
            'email' => 'johndoe@example.com',
            'password' => 'password123',
        ];
    
        $response = $this->postJson('/api/login', $credentials);
    
        $response->assertStatus(200)
                 ->assertJsonStructure(['status', 'access_token', 'token_type', 'user']);
    }
    
    public function test_login_fails_with_invalid_credentials()
    {
        $credentials = [
            'email' => 'nonexistent@example.com',
            'password' => 'wrongpassword',
        ];
    
        $response = $this->postJson('/api/login', $credentials);
    
        $response->assertStatus(401)
                 ->assertJson([
                     'status' => 'error',
                     'message' => 'Invalid credentials',
                 ]);
    }
    
    public function test_login_fails_with_missing_fields()
    {
        $credentials = [
            'email' => '',
            'password' => '',
        ];
    
        $response = $this->postJson('/api/login', $credentials);
    
        $response->assertStatus(422)
                 ->assertJsonStructure(['status', 'message']);
    }
}


