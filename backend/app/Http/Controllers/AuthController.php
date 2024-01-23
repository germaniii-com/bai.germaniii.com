<?php

namespace App\Http\Controllers;

use App\Http\Requests\AccessRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\DemoRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function access(AccessRequest $request)
    {
        $user = User::where('email', $request->email)->where('access_code', $request->access_code)->first();
        if ($user == null)
            return response()->json(['message' => 'User not found'], 404);

        Auth::setUser($user);
        if (!Auth::check())
            return response()->json(['message' => 'Unauthenticated'], 401);

        $request->session()->regenerate();
        return response()->json(['email' => $user->email], 200, []);
    }

    public function request(DemoRequest $request)
    {
        $email = Str::lower($request->email);
        $user = User::where('email', $email)->first();

        if ($user != null)
            return response()->json(['message' => 'Email already registered'], 400, []);
        // TODO: Add code to call email sending of generated token
        $new_user = DB::transaction(function () use ($email) {
            $new_user = new User();
            $new_user->email = $email;
            $new_user->access_code = Str::random(8);
            $new_user->save();

            return $new_user;
        });

        return response()->json(['email' => $new_user->email, 'access_code' => $new_user->access_code], 200, []);
    }

    public function user()
    {
        return response()->json(['AuthController/user'], 200, []);
    }
}
