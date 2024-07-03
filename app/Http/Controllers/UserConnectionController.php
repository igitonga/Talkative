<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\UserConnection;
use App\Models\User;
use App\Notifications\ConnectionRequest;
use DB;

class UserConnectionController extends Controller
{
    private function checkExistingConnection($userId){
        $existingConnection = UserConnection::where(function ($query) use ($userId) {
            $query->where(function ($query) {
                $query->where('party_A', auth()->user()->id)
                      ->orWhere('party_B', auth()->user()->id);
            })->where(function ($query) use ($userId) {
                $query->where('party_A', $userId)
                      ->orWhere('party_B', $userId);
            });
        })->get();

        return $existingConnection;
    }

    public function create(Request $request){
        try{
            DB::beginTransaction();

            $existConn = $this->checkExistingConnection($request->userId);

            if(!$existConn->isEmpty())
                return \response([
                    'message' => 'Existing connection request',
                    Response::HTTP_IM_USED
                ]);

            // user receiving request
            $user = User::find($request->userId);

            if(!$user)
                return \response([
                    'message' => $e->getMessage(),
                    Response::HTTP_NO_CONTENT
                ]);

            $userConnection = new UserConnection;
            $userConnection->party_A = auth()->user()->id;
            $userConnection->party_B = $request->userId;
            $userConnection->save();  

            $user->notify(new ConnectionRequest($user));    

            DB::commit();

            return \response([
                'message' => "Request is sent",
            ],  Response::HTTP_OK);            
        }
        catch(Exception $e){
            DB::rollback();
            return \response([
                'message' => $e->getMessage(),
            ],  Response::HTTP_NOT_FOUND);
        }
    }

    public function newFriends(){
        try{
            // $newFriends = UserConnection::
        }
        catch(Exception $e){
            return \response([
                'message' => $e->getMessage(),
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function getStats($user){
        $userId = $user->id;

        $requestsSent = UserConnection::where('party_A', $userId)->count();

        $requestsReceived = UserConnection::where('party_B', $userId)->count();

        $connections = UserConnection::where(function ($query) use ($userId) {
            $query->where('party_A',$userId)
                ->where('party_B',$userId);
            })
        ->where('status', 'accepted')->count();

        $data = array(
            'requestsSent' => $requestsSent,
            'requestsReceived' => $requestsReceived,
            'connections' => $connections,
        );

        return $data;
    }

}
