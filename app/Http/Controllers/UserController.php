<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\UserConnectionController;
use Illuminate\Validation\Rule;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;
use App\Events\UserEvent;
use DB;
use Auth;
class UserController extends Controller
{
    public function __construct()
    {
        # By default we are using here auth:api middleware
        $this->userConnectionController = new UserConnectionController;
    }

    public function register(Request $request){
        try{
            DB::beginTransaction();

            if(User::where('email', $request->email)->count()){
                return \response([
                    'message' => "Email is already taken",
                ],Response::HTTP_CONFLICT);
            }

            $user = new User;
            $user->first_name = $request->firstName;
            $user->last_name = $request->lastName;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->save();

            UserEvent::dispatch($user);   
            DB::commit();

            return \response([
                'message' => 'User registered successfully'
            ], Response::HTTP_OK);
        }
        catch(Exception $e){
            return \response([
                'message' => $e->getMessage(),
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function login(Request $request)
    {
        try{
            if(Auth::attempt(['email' => $request->email, 'password' => $request->password], $request->get('remember'))){
                $user = auth()->user();
                $token = $user->createToken('accessToken')->accessToken;

                $data['accessToken'] = $token;
                $data['user'] = $user;
                $data['connectsStats'] = $this->userConnectionController->getStats($user);
                $data['connections'] = [];

                $request->session()->put('accessToken', $token);

                return \response($data, Response::HTTP_OK);
            } 
            else {
                return \response([
                    'message' => $e->getMessage(),
                ],  Response::HTTP_CONFLICT);
            }
        }
        catch(Exception $e){
            return \response([
                'message' => $e->getMessage(),
            ],  Response::HTTP_NOT_FOUND);
        }
    }

    public function refresh(Request $request)
    {
        try{
            if($request->session()->has('accessToken')) {
                $user = Auth::user();
                $data['user'] = $user;
                $data['accessToken'] = $user->createToken('accessToken')->accessToken;
                $data['connectsStats'] = $this->userConnectionController->getStats($user);

                $request->session()->put('accessToken', $data['accessToken']);

                return \response($data, Response::HTTP_OK); 
            }
            return response([
                'message' =>'You need to login'
            ], Response::HTTP_UNAUTHORIZED); 
        }
        catch(Exception $e){
            return \response([
                'message' => $e->getMessage(),
            ],  Response::HTTP_NOT_FOUND);
        }
    }

    public function logout(Request $request){
        try{
            $request->session()->forget('accessToken');;

            return \response([
                'message' => 'Logout successfully'
            ], Response::HTTP_OK);  
        }
        catch(Exception $e){
            return \response([
                'message' => $e->getMessage(),
            ],  Response::HTTP_NOT_FOUND);
        }
    }

    public function update(Request $request){
        try{
            DB::beginTransaction();

            $user = User::find(auth()->user()->id);

            $user->first_name = $request->firstName;
            $user->last_name = $request->lastName;
            $user->email = $request->email;
            $user->dob = $request->dob;
            $user->gender = $request->gender;
            $user->country = $request->country;
            $user->save(); 

            DB::commit();
            return \response([
                'status' => Response::HTTP_OK,
                'message' => 'Profile update successfully'
            ]);
        }
        catch(Exception $e){
            return \response([
                'status' => Response::HTTP_NOT_FOUND,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function getUsers(){
        try{
            $users = User::where('id', '!=', auth()->user()->id)->get();

            return \response([
                'status' => Response::HTTP_OK,
                'message' => 'All users',
                'data' => $users,
            ]);
        }
        catch(Exception $e){
            return \response([
                'status' => Response::HTTP_NOT_FOUND,
                'message' => $e->getMessage(),
            ]);
        }
    }
}
