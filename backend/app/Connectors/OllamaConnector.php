<?php

namespace App\Connectors;

use Illuminate\Support\Facades\Http;

class OllamaConnector
{
    public function prompt(string $message, string $model)
    {
        $body = [
            'message' => $message,
            'model' => $model,
            'stream' => false,
        ];

        $response = Http::post('bai_ollama', $body);
        $response_json = $response->json();

        $data = $response_json['response'];

        return $data;
    }
}
