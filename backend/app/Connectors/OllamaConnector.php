<?php

namespace App\Connectors;

use Illuminate\Support\Facades\Http;

class OllamaConnector
{
    public function prompt(string $message, string $model)
    {
        $body = [
            'prompt' => $message,
            'model' => $model,
            'stream' => false,
        ];

        set_time_limit(0);
        $ollama_response = Http::timeout(180)
            ->post(env('OLLAMA_BASE_URL') ."/api/generate", $body);

        $data = $ollama_response->json();

        return $data;
    }

    public function chat(array $messages, string $model)
    {
        $body = [
            'messages' => $messages,
            'model' => $model,
            'stream' => false,
        ];

        set_time_limit(0);
        $ollama_response = Http::timeout(180)
            ->post(env('OLLAMA_BASE_URL') . '/api/chat', $body);

        $data = $ollama_response->json();

        return $data;
    }
}
