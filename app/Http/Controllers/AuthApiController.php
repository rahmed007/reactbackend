<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthApiController extends Controller
{
    public function register(Request $request)
    {
        try{
            $validateUser = Validator::make($request->all(), 
            [
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' =>'required'
            ]);

            if($validateUser->fails())
            {
                return response()->json([
                    'status' => 'false',
                    'message' => 'Validation error',
                    'errors' => $validateUser->errors(),
                ], 401);
            }

            $user = User::create([
                'name' => 'Zeeshan',
                'email' => 'zeeshan@gmail.com',
                'password' => '123456'
            ]);

            return response()->json([
                'status' => 'true',
                'message' => 'User Registered Successfully',
                'token' => $user->createToken("API Token")->plainTextToken
            ], 200);

        }
        catch(\throwable $th)
        {
            return response()->json([
                'status' => 'false',
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        try
        {
            $validateUser = Validator::make($request->all(), 
            [
                'email' => 'required|email',
                'password' =>'required'
            ]);

            if($validateUser->fails())
            {
                return response()->json([
                    'status' => 'false',
                    'message' => 'Validation error',
                    'errors' => $validateUser->errors(),
                ], 401);
            }

            if(!Auth::attempt($request->only(['email', 'password'])))
            {
                return response()->json([
                    'status' => 'false',
                    'message' => 'The email and password does not matches with our record',
                ], 401);
            }

            $user = User::where('email', $request->email)->first();

            return response()->json([
                'status' => 'true',
                'message' => 'User Logged In successfully',
                'token' => $user->createToken("API Token")->plainTextToken
            ], 200);
        }
        catch(\throwable $th)
        {
            return response()->json([
                'status' => 'false',
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function profile()
    {
        $userData = auth()->user();
        return response()->json([
            'status' => 'true',
            'message' => 'Profile Information',
            'date' => $userData,
            'id' => auth()->user()->id
        ], 200);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            'status' => 'true',
            'message' => 'Logout Successfully',
            'date' => [],
        ], 200);
    }
}
