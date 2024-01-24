<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use App\Models\User;
use App\Events\UserEvent;
use DB;

class UserController extends Controller
{
    public function __construct()
    {
        # By default we are using here auth:api middleware
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }

    protected function respondWithToken($token)
    {
        # This function is used to make JSON response with new
        # access token of current user
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }

    public function register(Request $request){
        try{
            DB::beginTransaction();

            $user = new User;
            $user->first_name = $request->firstName;
            $user->last_name = $request->lastName;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->save();

            UserEvent::dispatch($user);   
            DB::commit();

            return \response([
                'status' => Response::HTTP_OK,
                'message' => 'User registered successfully'
            ]);
        }
        catch(Exception $e){
            return \response([
                'status' => Response::HTTP_NOT_FOUND,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function login()
    {
        try{
            $credentials = request(['email', 'password']);

            if(!$token = auth()->attempt($credentials)) {
                return response([
                    'status' => Response::HTTP_UNAUTHORIZED,
                    'message' => 'Wrong email or password',
                ]);
            }
    
            return $this->respondWithToken($token);
        }
        catch(Exception $e){
            return \response([
                'status' => Response::HTTP_NOT_FOUND,
                'message' => $e->getMessage(),
            ]);
        }
    }
}
