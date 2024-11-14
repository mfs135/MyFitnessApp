<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\JWTGuard;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'status' => 'success',
            'access_token' => $token,
            'token_type' => 'bearer',
            'user' => auth()->user()
        ]);
    }
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only(['email', 'password']);
        
        // Add validation for email and password.
        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors(),
            ], 422);
        }
    
        Log::info('Login attempt:', ['email' => $credentials['email']]);
    
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                Log::warning('Login failed for user:', ['email' => $credentials['email']]);
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid credentials',
                ], 401);
            }
            Log::info('Login successful:', ['email' => $credentials['email']]);
            
            return $this->respondWithToken($token);
    
        } catch (\Exception $e) {
            //log the error msg.
            Log::error('Login error:', ['message' => $e->getMessage()]);
            return response()->json([
                'status' => 'error',
                'message' => 'Authentication system error',
            ], 500);
        }
    }
    
    public function register(Request $request){

        $credentials = $request->only(['name','email','password']);

        $validator = Validator::make($credentials , [
            'name' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors(),
            ], 422);
        }

        Log::info('SignUp Attempt :' , ['email' => $credentials['email']]);

        try{
            $credentials['password'] = bcrypt($credentials['password']);
            User::create($credentials);

            return response()->json([
                'message' => 'successful',
                'status' => 202,
            ],202);

        }catch(Exception $e){
            Log::error('SignUp error:', ['message' => $e->getMessage()]);
            return response()->json([
                'status' => 'error',
                'message' => 'SignUp error',
            ], 500);
        }
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(JWTGuard::auth()->refresh());
    }

}
