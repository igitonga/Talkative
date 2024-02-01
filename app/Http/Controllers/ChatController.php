<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Events\MessageEvent;

class ChatController extends Controller
{
    public function message(Request $request){
        try{
            //event(new MessageEvent($request->message));
            
            MessageEvent::dispatch('nooo');
            return \response([
                'status' => Response::HTTP_OK,
                'message' => 'Message sent',
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
