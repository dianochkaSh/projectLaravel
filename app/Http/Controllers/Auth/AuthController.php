<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;

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


    public function signInGoogle (Request $request) {
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

}