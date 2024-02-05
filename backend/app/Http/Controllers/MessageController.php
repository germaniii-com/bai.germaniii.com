<?php

namespace App\Http\Controllers;

use App\Connectors\OllamaConnector;
use App\Constants\SenderTypes;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMessageRequest;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    private OllamaConnector $ollama;

    public function __construct(OllamaConnector $ollama)
    {
        $this->ollama = $ollama;
    }

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
        $user_id = auth()->user()->id;

        $new_message = DB::transaction(
            function () use ($user_id, $message, $model, $conversationId) {
                $new_message = new Message();
                $conversation = Conversation::where('user_id', $user_id)
                    ->where('id', $conversationId)
                    ->firstOrFail();
                $new_message->sender = SenderTypes::USER;
                $new_message->message = $message;
                $new_message->model = $model;
                $new_message->conversation_id = $conversationId;
                $conversation->last_message = $message;
                $new_message->save();


                $messages = Message::where('conversation_id', $conversationId)
                    ->orderBy('created_at', 'desc')
                    ->offset(1)
                    ->take(10)
                    ->get();
                $messages->reverse();

                $prompts = [];
                foreach ($messages as $message) {
                    $prompts[] = [
                        'content' => $message['message'],
                        'role' => $message['sender'],
                    ];
                }

                $prompts[] = [
                    'content' => $new_message->message,
                    'role' => SenderTypes::USER,
                ];

                $ollama_response = $this->ollama->chat($prompts, $model);
                $ollama_message = new Message();
                $ollama_message->message = $ollama_response['message']['content'] ??  '';
                $ollama_message->model = $model;
                $ollama_message->sender = SenderTypes::MACHINE;
                $ollama_message->conversation_id = $conversationId;
                $ollama_message->save();

                $conversation->save();

                return [$ollama_message, $new_message];
            }
        );

        return response()->json($new_message, 200, []);
    }
}
