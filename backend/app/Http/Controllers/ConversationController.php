<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreConversationRequest;
use App\Models\Conversation;
use Illuminate\Support\Facades\DB;

// use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $conversations = $user->conversations;
        return response()->json($conversations, 200, []);
    }

    public function store(StoreConversationRequest $request)
    {
        $user = auth()->user();
        $message = $request->message;
        $conversation = DB::transaction(function () use ($user, $message) {
            $new_conversation = new Conversation();
            $new_conversation->title = $message;
            $new_conversation->last_message = $message;
            $new_conversation->user()->associate($user);
            $new_conversation->save();

            return [
                'id' => $new_conversation->id,
                'title' => $new_conversation->title,
                'last_message' => $new_conversation->last_message,
                'created_at' => $new_conversation->created_at,
                'updated_at' => $new_conversation->updated_at
            ];
        });

        return response()->json($conversation, 200, []);
    }

    public function delete($conversationId)
    {
        $user = auth()->user();

        DB::transaction(function () use ($user, $conversationId) {
            $conversation_to_delete = Conversation::where('user_id', $user->id)
                ->where('id', $conversationId)
                ->firstOrFail();

            $conversation_to_delete->messages()->delete();
            $conversation_to_delete->delete();
        });

        return response(null, 204);
    }
}
