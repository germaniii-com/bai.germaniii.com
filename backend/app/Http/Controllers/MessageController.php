<?php

namespace App\Http\Controllers;

use App\Constants\SenderTypes;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMessageRequest;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Support\Facades\DB;

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

    public function store(StoreMessageRequest $request, $conversationId)
    {
        $message = $request->message;
        $model = $request->model;

        $new_message = DB::transaction(
            function () use ($message, $model, $conversationId) {
                $new_message = new Message();
                $new_message->sender = SenderTypes::USER;
                $new_message->message = $message;
                $new_message->model = $model;
                $new_message->conversation_id = $conversationId;

                // TODO: Add a line to call ollama api

                $new_message->save();
                return $new_message;
            }
        );

        return response()->json($new_message, 200, []);
    }
}
