<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\ChatController;
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
        $this->middleware('auth:api', ['except' => ['login','register']]);
        $this->chatController = new ChatController;
    }

    protected function respondWithToken($token)
    {
        # This function is used to make JSON response with new
        # access token of current user
        return response()->json([
            'status' => Response::HTTP_OK,
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
        ]);
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
            $credentials = request(['email', 'password']);

            if(!$token = auth()->attempt($credentials)) {
                return response([
                    'message' => 'Wrong email or password',
                ], Response::HTTP_FORBIDDEN);
            }

            $request->session()->put('access_token', $token);
            $user = Auth::user();
            $respString = $this->respondWithToken($token);
            $respJson = \json_encode($respString);
            $respArray = \json_decode($respJson);

            $data['accessToken'] = $respArray->original->access_token;
            $data['user'] = $user;
            $data['connectsStats'] = $this->chatController->getStats($user);
            $data['connections'] = [];

            return \response(array(
                'data' => $data,
            ), Response::HTTP_OK);
        }
        catch(Exception $e){
            return \response([
                'message' => $e->getMessage(),
            ],  Response::HTTP_NOT_FOUND);
        }
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    public function logout(Request $request){
        try{
            JWTAuth::parseToken()->invalidate(true);
            $request->session()->forget('accessToken');;

            return \response([
                'status' => Response::HTTP_OK,
                'message' => 'Logout successfully'
            ]);  
        }
        catch(Exception $e){
            return \response([
                'status' => Response::HTTP_NOT_FOUND,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function retrieveAccessToken(Request $request) {
        try{
            if($request->session()->has('access_token')) {
                $user = Auth::user();
                $data['user'] = $user;
                $data['access_token'] = $user->createToken('access_token')->accessToken;

                $request->session()->put('access_token', $data['access_token']);

                return \response([
                    'status' => Response::HTTP_OK,
                    'message' => $data
                ]); 
            } 
            else {
                return response([
                    'status' => Response::HTTP_UNAUTHORIZED,
                    'message' =>'You need to login'
                ]); 
            }
        }
        catch(Exception $e){
            return \response([
                'status' => Response::HTTP_NOT_FOUND,
                'message' => $e->getMessage(),
            ]);
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
