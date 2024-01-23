<?php

namespace App\Http\Controllers;

use App\Http\Requests\AccessRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function access(AccessRequest $request)
    {
        return response()->json(['AuthController/access'], 200, []);
    }

    public function request(Request $request)
    {
        return response()->json(['AuthController/request'], 200, []);
    }

    public function user(Request $request)
    {
        return response()->json(['AuthController/user'], 200, []);
    }
}
