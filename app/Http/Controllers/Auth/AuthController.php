<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\MailtrapUserRegistration;
use App\Mail\MailtrapUserChangePassword;
use App\Repositories\AccessTokenRepository;
use App\Models\OauthAccessToken;
use App\Models\OauthRefreshToken;
use App\Repositories\RefreshTokenRepository;

class AuthController extends Controller {

    public function login(Request $request) {
        return \App::call('\Laravel\Passport\Http\Controllers\AccessTokenController@issueToken', [$request]);
    }

    public function registration(Request $request) {
        $validateFields = Validator::make($request->all(), [
            'name'      => ['required', 'string', 'max:255'],
            'email'  => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password'  => ['required', 'string', 'min:6'],
        ]);
        if ($validateFields->fails()) {
            return response()->json(['error' => $validateFields->errors()->getMessages() ], 400);
        }

        $data = [
            'name'          => $request->get('name'),
            'email'         => $request->get('email'),
            'password'      => $request->get('password'),
            'provider'      => '',
            'provider_id'   => '',
            'photo'         => ''
        ];
        $userRepo = new UserRepository(new User);
        $user = $userRepo->createUser($data);
        $request->request->add([
            'username'      => $request->get('email'),
        ]);
        Mail::to($request->get('email'))->send(new MailtrapUserRegistration($request->get('name')));
        return \App::call('\Laravel\Passport\Http\Controllers\AccessTokenController@issueToken', [$request]);
    }

    public function logout (Request $request) {
        $accessToken = auth()->guard('api')->user()->token();
        DB::table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true
            ]);

        $accessToken->revoke();
        return response()->json(null, 204);
    }

    public function changePassword(Request $request) {
        $validateFields = Validator::make($request->all(), [
            'oldPassword'  => ['required', 'string', 'min:6'],
            'newPassword'  => ['required', 'string', 'min:6'],
        ]);
        if ($validateFields->fails()) {
            return response()->json(['error' => $validateFields->errors()->getMessages() ], 400);
        }
        $user = auth()->guard('api')->user();
        $user->password = Hash::make($request->get('newPassword'));
        $user->save();
        return response()->json(['success' => 'Password has changed.' ], 200);
    }


    public function signInSocialNetwork (Request $request) {
        $request->request->add([
            'username'      => $request->get('email'),
            'password'      => '',
        ]);
        $userRepo = new UserRepository(new User);
        $existUser = $userRepo->getUserByProviderId($request->get('provider_id'));
        if (!$existUser) {
            $data = [
                'name'          => $request->get('name'),
                'email'         => $request->get('email'),
                'provider'      => $request->get('provider'),
                'provider_id'   => $request->get('provider_id'),
                'password'      => '',
                'photo'         => $request->get('photo'),
            ];
            $userRepo->createUser($data);
        }
        return \App::call('\Laravel\Passport\Http\Controllers\AccessTokenController@issueToken', [$request]);
    }


    public function sendLetterForChangePassword(Request $request) {
        $email = $request->email;
        $userRepo = new UserRepository(new User);
        $user = $userRepo->getUserByEmail($email);
        if ( count($user) > 0) {
            $tokenRepo = new AccessTokenRepository(new OauthAccessToken);
            $oauthToken = $tokenRepo->getTokenByUserId($user->getAttribute('id'));

            $tokenNew = openssl_random_pseudo_bytes(60);
           // $tokenNew = bin2hex($tokenNew);
            $tokenNew = hash('sha256',$tokenNew);

            $tokenOld = $oauthToken->id;
            $tokenRepo->updateOauthAccessToken($tokenOld, $tokenNew);

            $refreshTokenRepo = new RefreshTokenRepository(new OauthRefreshToken);
            $refreshTokenRepo->updateRefreshToken($tokenOld, $tokenNew);

            $link = 'https://' . request()->getHost() . '/newPassword/' . $tokenNew . '/' . $email;
            Mail::to($email)->send(new MailtrapUserChangePassword($link, $user->getAttribute('name')));
            return response()->json(['success' => 'The letter was sent. Please check mail. ' ], 200);
        } else {
            return response()->json(['error' => 'Email is not exists. Please check email.' ], 400);
        }
    }

    public function checkTokenUser(Request $request) {
        $email = $request->get('email');
        $token = $request->get('token');
        $userRepo = new UserRepository(new User);
        $user = $userRepo->getUserByEmail($email);
        if ( count($user) > 0) {

            $tokenRepo = new AccessTokenRepository(new OauthAccessToken);
            $oauthToken = $tokenRepo->getTokenByUserIdAndToken($user->getAttribute('id'), $token);
            $tokenTime = $oauthToken->getAttribute('created_at');
            $timeToken = strtotime($tokenTime);
            $currentTime = strtotime(date('Y-m-d H:i:s'));
            $delta = $currentTime - $timeToken ;
            $seconds = abs($delta);
            $hour = floor($seconds / 60);
            if ($hour > 30) {
                return response()->json(['error' => 'The token is not valid.' ], 400);
            } else {
                return response()->json(['success' => 'The token is valid.' ], 200);
            }
        }
    }

    public function newPassword(Request $request){
        $userRepo = new UserRepository(new User);
        $user = $userRepo->getUserByEmail($request->get('email'));
        if (count($user) > 0) {
            $userRepo->updatePassword($user->getAttribute('id'), Hash::make($request->get('password')));
            return response()->json(['success' => 'The Password is changed. Please, go to ' ], 200);
        } else {
            return response()->json(['error' => 'Error. The password is not changed.' ], 400);
        }

    }
}