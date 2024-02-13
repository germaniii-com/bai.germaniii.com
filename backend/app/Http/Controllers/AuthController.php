<?php

namespace App\Http\Controllers;

use App\Http\Requests\AccessRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\DemoRequest;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use SendGrid;
use SendGrid\Mail\Mail;

class AuthController extends Controller
{
    private SendGrid $sendgrid;

    public function __construct()
    {
        $this->sendgrid = new SendGrid(env('SENDGRID_API_KEY'));
    }

    public function access(AccessRequest $request)
    {
        $credentials = ['email' => $request->email, 'password' => $request->access_code];

        $user = User::where('email', $request->email)
            ->first();

        if (!$user || !Hash::check($credentials['password'], $user->password))
            return response()->json(['message' => 'Unauthenticated'], 401);

        if ($user->expire_at <= Carbon::now()) {
            $user->delete();
            return response()->json(['message' => 'Sorry, your trial has expired. Thank you!'], 400);
        }

        $token = $user->createToken($credentials['email'])->plainTextToken;
        return response()->json(['message' => 'Authenticated', 'token' => $token], 200, []);
    }

    public function request(DemoRequest $request)
    {
        $email = Str::lower($request->email);
        $user = User::withTrashed()->where('email', $email)->first();

        if ($user != null)
            return response()->json(['message' => 'Email already registered'], 400, []);

        $password = Str::random(8);
        DB::transaction(function () use ($email, $password) {
            $new_user = new User();
            $new_user->email = $email;
            $new_user->password = $password;
            $new_user->expire_at = Carbon::now()->addDay(1);
            $new_user->save();

            $sendgrid_mail = new Mail();
            $sendgrid_mail->setFrom(env('SENDGRID_EMAIL_FROM'), "German III");
            $sendgrid_mail->addTo($email, "User");
            $sendgrid_mail->setTemplateId(env('SENDGRID_ACCESS_EMAIL_TEMPLATE_ID'));
            $sendgrid_mail->addDynamicTemplateData("access_code", $password);
            $sendgrid_mail->addDynamicTemplateData("Sender_Name", "German III");
            $sendgrid_mail->addDynamicTemplateData("login_url", env('FRONTEND_URL') . "/?email=" . $email . '&access_code=' . $password);

            try {
                $this->sendgrid->send($sendgrid_mail);
            } catch (Exception $e) {
                throw $e;
            }
        });


        return response()->json(['message' => 'Authenticated'], 200, []);
    }

    public function logout(Request $request)
    {
        $user = auth()->user();
        $user->tokens()->delete();

        return response()->json(['message' => 'Logged out'], 400, []);
    }

    public function user()
    {
        return response()->json(['user' => auth()->user()], 200, []);
    }
}
