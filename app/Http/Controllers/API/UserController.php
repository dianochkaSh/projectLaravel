<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Storage;
use OpenApi\Annotations as OA;


/**
 * Class UserController
 */
class UserController extends Controller {

     /**
     *
     * @param Request $request
     * @return Response
     *
     * @OA\Get(
     *      path="/getUser",
     *      tags={"User"},
     *      summary="Get information about user",
     *      description="Get information about user",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\Schema(
     *              type="object",
     *              allOf={@OA\Schema(ref="#definitions/ApiResponse")},
     *              @OA\Property(
     *                  property="data",
     *                  ref="#/definitions/User",
     *              )
     *          )
     *      ),
     *      security={{"auth": {}}}
     * )
     */
    public function get(Request $request) {
        $user = $accessToken = auth()->guard('api')->user();
        if (!empty($user->getAttribute('photo'))) {
            if (strpos($user->getAttribute('photo'), 'http') === 0) {
                $fullPath = $user->getAttribute('photo');
            } else {
                $fullPath = Storage::disk('public')->url($user->getAttribute('photo'));
            }
        } else {
            $fullPath = null;
        }
        $dataUser = [
            'name'      => $user->getAttribute('name'),
            'email'     => $user->getAttribute('email'),
            'id'        => $user->getAttribute('id'),
            'provider'  => $user->getAttribute('provider'),
            'photo'     => $fullPath
        ];
        return response()->json($dataUser, 200);
    }


    /**
     *
     * @param Request $request
     * @return Response
     *
     * @OA\Post(
     *      path="/uploadPhoto",
     *      tags={"User"},
     *      summary="Upload photo user",
     *      description="Upload photo user",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              @OA\Schema(
     *                  @OA\Property(
     *                      property="file",
     *                      description="Upload photo",
     *                      type="string",
     *                  ),
     *              ),
     *           ),
     *       ),
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\Schema(
     *              type="object",
     *              allOf={@OA\Schema(ref="#definitions/ApiResponse")},
     *              @OA\Property(
     *                  property="data",
     *                  ref="#/definitions/User",
     *              )
     *          )
     *      ),
     *      security={{"auth": {}}}
     * )
     */
    public function uploadPhoto(Request $request) {
        $user = $accessToken = auth()->guard('api')->user();
        $file = $request->file('file');
        $ext = $file->extension();
        $name = Str::random().'.'.$ext ;
        $file = $request->file('file');
        $path = Storage::disk('public')->putFileAs('uploads', $file, $name);
        if ($path) {
            $userRepo = new UserRepository(new User);
            $uploadPhoto = $userRepo->updatePhoto($user->getAttribute('id'), $path);
            $fullPath = Storage::disk('public')->url($path);
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

    /**
     *
     * @param Request $request
     * @return Response
     *
     * @OA\Post(
     *      path="/edit",
     *      tags={"User"},
     *      summary="Edit user",
     *      description="Edit user",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              @OA\Schema(
     *                  @OA\Property(
     *                      property="name",
     *                      description="Name user",
     *                      type="string",
     *                  ),
     *                  @OA\Property(
     *                      property="email",
     *                      description="E-mail user",
     *                      type="string",
     *                  ),
     *              ),
     *           ),
     *       ),
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\Schema(
     *              type="object",
     *              allOf={@OA\Schema(ref="#definitions/ApiResponse")},
     *              @OA\Property(
     *                  property="data",
     *                  ref="#/definitions/User",
     *              )
     *          )
     *      ),
     *      @OA\Response(
     *         response=400,
     *         description="Data of user has not updated",
     *     ),
     *      security={{"auth": {}}}
     * )
     */
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