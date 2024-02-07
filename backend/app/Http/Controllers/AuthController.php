<?php

namespace App\Http\Controllers;

use App\Http\Requests\AccessRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\DemoRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        if (!auth()->guard()->attempt($credentials))
            return response()->json(['message' => 'Unauthenticated'], 401);

        $request->session()->regenerate();
        return response()->json(['message' => 'Authenticated'], 200, []);
    }

    public function request(DemoRequest $request)
    {
        $email = Str::lower($request->email);
        $user = User::withTrashed()->where('email', $email)->first();

        if ($user != null)
            return response()->json(['message' => 'Email already registered'], 400, []);

        $password = Str::random(8);
        $new_user = DB::transaction(function () use ($email, $password) {
            $new_user = new User();
            $new_user->email = $email;
            $new_user->password =  $password;
            $new_user->save();

            $sendgrid_mail = new Mail();
            $sendgrid_mail->setFrom("germaniiifelisarta@gmail.com", "German III");
            $sendgrid_mail->addTo($email, "User");
            $sendgrid_mail->setTemplateId(env('SENDGRID_ACCESS_EMAIL_TEMPLATE_ID'));
            $sendgrid_mail->addDynamicTemplateData("access_code", $password);
            $sendgrid_mail->addDynamicTemplateData("Sender_Name", "German III");
            $sendgrid_mail->addDynamicTemplateData("login_url", "bai.germaniii.com/?email=" . $email . '&?access_code=' . $password);

            try {
                $this->sendgrid->send($sendgrid_mail);
            } catch (Exception $e) {
                throw $e;
            }

            return $new_user;
        });


        return response()->json(['email' => $new_user->email, 'access_code' => $password], 200, []);
    }

    public function logout(Request $request)
    {
        if (auth()->guard()->guest())
            return response()->json(['message' => 'Unauthenticated'], 400, []);

        auth()->guard()->logout();
        $request->session()->invalidate();
        $request->session()->regenerate();

        return response()->json(['message' => 'Unauthenticated'], 400, []);
    }

    public function user()
    {
        return response()->json(['user' => auth()->user()], 200, []);
    }
}
