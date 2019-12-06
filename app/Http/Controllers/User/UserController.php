<?php
namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller {

    public function get(Request $request) {
        $user = $accessToken = auth()->guard('api')->user();
        if (!empty($user->getAttribute('photo'))) {
            $path = Storage::url($user->getAttribute('photo'));
            $fullPath = 'http://'.request()->getHttpHost() . $path;
        } else {
            $fullPath = undefined;
        }
        $dataUser = [
          'name'    => $user->getAttribute('name'),
          'email'   => $user->getAttribute('email'),
          'id'      => $user->getAttribute('id'),
          'photo'   => $fullPath
        ];
        return response()->json($dataUser, 200);
    }

    public function uploadPhoto(Request $request) {
        $user = $accessToken = auth()->guard('api')->user();
        $file = $request->file('file');
        $ext = $file->extension();
        $name = Str::random().'.'.$ext ;
        $path = $request->file('file')->storeAs('public/uploads',$name);
        if ($path) {
            $userRepo = new UserRepository(new User);
            $path = substr( stristr($path, '/'), 1, strlen($path));
            $uploadPhoto = $userRepo->updatePhoto($user->getAttribute('id'), $path);
            $newPath = Storage::url($path);
            $fullPath = 'http://'.request()->getHttpHost() . $newPath;
            return response()->json(['photo' => $fullPath ], 200);
        } else {
            return response()->json(['error' => 'File has not upload.' ], 400);
        }

    }

    public function deletePhoto() {
        $user = $accessToken = auth()->guard('api')->user();
        $userRepo = new UserRepository(new User);
        $deletePhoto = $userRepo->updatePhoto($user->getAttribute('id'), '');
        if ($deletePhoto) {
            return response()->json(['message' => 'User Photo deleted.' ], 200);
        }

    }

    public function edit(Request $request) {
        $dataUser = [
            'name'  => $request->get('username'),
            'email' => $request->get('email')
        ];
        $userRepo = new UserRepository(new User);
        $updateUserData = $userRepo->updateUser($request->get('id'), $dataUser);
        if ($updateUserData) {
            return response()->json(['success' => 'Data of user has updated.' ], 200);
        } else {
            return response()->json(['error' => 'Data of user has not updated.' ], 400);
        }

    }
}