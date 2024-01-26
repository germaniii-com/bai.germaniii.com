<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Conversation;

class MessageController extends Controller
{
    public function index($conversationId)
    {
        $user = auth()->user();
        $conversation =
            Conversation::where('user_id', $user->id)
            ->where('id', $conversationId)
            ->firstOrFail();

        $messages = $conversation->messages;

        return response()->json($messages, 200, []);
    }
}
