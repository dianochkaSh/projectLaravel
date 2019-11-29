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
        $dataUser = [
          'name'    => $user->getAttribute('name'),
          'email'   => $user->getAttribute('email'),
          'photo'   => $user->getAttribute('photo')
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
            //$url = Storage::url($path);
            $userRepo = new UserRepository(new User);
            $uploadPhoto = $userRepo->updatePhoto($user->getAttribute('id'), $path);
            return response()->json(['photo' => $uploadPhoto ], 200);
        } else {
            return response()->json(['error' => 'File has not upload.' ], 400);
        }

    }
}