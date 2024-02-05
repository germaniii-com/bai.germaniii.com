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
            ->post('http://bai_ollama:11434/api/generate', $body);

        $data = $ollama_response->json();

        return $data;
    }
}
