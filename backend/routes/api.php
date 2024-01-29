<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/health', function () {
    return response()->json([], 200);
});

Route::post('/auth/request', [AuthController::class, 'request']);

Route::middleware('web')->group(function () {
    Route::post('/auth/access', [AuthController::class, 'access']);
    Route::get('/auth/logout', [AuthController::class, 'logout']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/user', [AuthController::class, 'user']);

    Route::get('/conversations', [ConversationController::class, 'index']);
    Route::post('/conversations', [ConversationController::class, 'store']);
    Route::delete('/conversations/{conversationId}', [])->where('conversationId', '[0-9a-zA-Z]{26}');

    Route::get('/conversations/{conversationId}/messages', [MessageController::class, 'index'])->where('conversationId', '[0-9a-zA-Z]{26}');
    Route::post('/conversations/{conversationId}/messages', [MessageController::class, 'store'])->where('conversationId', '[0-9a-zA-Z]{26}');
});
