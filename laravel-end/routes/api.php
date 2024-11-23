<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GoalController; // Make sure to import the GoalController
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StatsController;

/*
|-------------------------------------------------------------------------- 
| API Routes 
|-------------------------------------------------------------------------- 
| Here is where you can register API routes for your application. These 
| routes are loaded by the RouteServiceProvider within a group which 
| is assigned the "api" middleware group. Enjoy building your API! 
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// Authentication routes
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

Route::group(['middleware' => 'api'], function () {
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('refresh', [AuthController::class, 'refresh'])->name('refresh');
    Route::post('me', [AuthController::class, 'me'])->name('me');

    Route::get('goals', [GoalController::class, 'index']);
    Route::post('goals', [GoalController::class, 'store']);
    
    Route::get('all-goal-data', [GoalController::class, 'getAllGoalData'])->name('all-goal-data');
    
    Route::get('/stats', [StatsController::class, 'getStats']);

    Route::put('goals/{id}', [GoalController::class, 'update']); // Update a goal
    Route::delete('goals/{id}', [GoalController::class, 'destroy']); // Delete a goal

});
