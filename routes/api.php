<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;   
use App\Http\Controllers\UserController;
use App\Http\Controllers\ChatController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('login', [UserController::class, 'login']);
Route::post('register', [UserController::class, 'register']);
Route::post('refresh', [UserController::class, 'refresh']);
Route::get('retrieve-access-token', [UserController::class, 'retrieveAccessToken']);

Route::middleware('auth')->group(function () {
    Route::get('logout', [UserController::class, 'logout']);
    Route::post('update-user', [UserController::class, 'update']); 
    Route::get('get-users', [UserController::class, 'getUsers']);

    Route::post('send-message', [ChatController::class, 'message']); 
});
 
