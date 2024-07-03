<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class NotificationsController extends Controller
{
    public function unreadNotifications(){
        try{
            $user = auth()->user();

            $count = $user->unreadNotifications->count();
            $notifications = $user->unreadNotifications;

            return \response(array(
                'count' => $count,
                'data' => $notifications,
            ), Response::HTTP_OK); 
        }
        catch(Exception $e){
            return \response([
                'message' => $e->getMessage(),
            ],  Response::HTTP_NOT_FOUND);
        }
    }

    public function markAllAsRead(){
        try{
            auth()->user()->unreadNotifications->markAsRead();
            
            return \response('All notifications have been marked', Response::HTTP_OK);
        }
        catch(Exception $e){
            return \response([
                'message' => $e->getMessage(),
            ],  Response::HTTP_NOT_FOUND);
        }
    }
}
