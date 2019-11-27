<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller {

    public function login(Request $request) {
        return \App::call('\Laravel\Passport\Http\Controllers\AccessTokenController@issueToken', [$request]);
    }

    public function registration(Request $request) {
        $validateFields = Validator::make($request->all(), [
            'name'      => ['required', 'string', 'max:255'],
            'email'     => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password'  => ['required', 'string', 'min:6'],
        ]);
        if ($validateFields->fails()) {
            return response()->json(['error' => $validateFields->errors()->getMessages() ], 400);
        }
        $user = User::create([
            'name'     => $request->get('name'),
            'email'    => $request->get('email'),
            'password' => Hash::make($request->get('password')),
        ]);
        $data = [
            'client_id'     => $request->get('client_id'),
            'client_secret' => $request->get('client_secret'),
            'username'      => $request->get('email'),
            'password'      => $request->get('password'),
            'grant_type'    => $request->get('grant_type'),
            'scope'    => $request->get('scope'),
        ];

    }

    public function logout (Request $request) {
        $accessToken = auth()->guard('api')->user();
        DB::table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true
            ]);

        $accessToken->revoke();
        return response()->json(null, 204);
        //return \App::call('\Laravel\Passport\Http\Controllers\AuthorizedAccessTokenController@destroy', [$request]);
    }

}