<?php
namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class AuthController extends Controller {

    public function login(Request $request) {
        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = Auth::user();
            $success['token'] =  $user->createToken('MyApp')-> accessToken;
            $success['expires_at'] = Carbon::now()->addDays(10);
            $success['name'] = $user->getAttribute('name');
            return response()->json(['success' => $success],200);
        } else {
            return response()->json(['error' => 'Unauthorised user. Please check user/password.'], 401);
        }

    }

    public function registration(Request $request) {
        $validateFields = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:6'],
        ]);
        if ($validateFields->fails()) {
            return response()->json(['error' => $validateFields->errors()->getMessages() ], 400);
        }
        $user = User::create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
        ]);
        $success['token'] =  $user->createToken('MyApp')-> accessToken;
        $success['expires_at'] = Carbon::now()->addDays(10);
        $success['name'] =  $user->name;
        return response()->json(['success' => $success], 200);
    }

    public function logout (Request $request) {
        $request->user()->token()->revoke();
        return response()->json(['message' => 'You logged out.'], 200);
    }

}