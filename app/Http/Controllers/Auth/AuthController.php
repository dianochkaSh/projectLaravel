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
use OpenApi\Annotations as OAS;

/**
 * Class AuthController
 */
class AuthController extends Controller {

    /**
     * @OA\Get(path="/auth/login",
     *   tags={"Auth"},
     *   summary="Log in user",
     *   description="",
     *   @OA\Response(response="default", description="successful operation")
     * )
     */
    public function login(Request $request)
    {
        return \App::call('\Laravel\Passport\Http\Controllers\AccessTokenController@issueToken', [$request]);
    }


    /**
     * @param Request $request
     * @return Response
     *
     * @OA\Post(
     *      path="/auth/registration",
     *      tags={"Auth"},
     *      summary="Registaration user",
     *      description="Registaration user",
     *     @OA\RequestBody(
     *     required=true,
     *     @OA\MediaType(
     *       mediaType="application/json",
     *       @OA\Schema(
     *         @OA\Property(
     *           property="name",
     *           description="Name user",
     *           type="string",
     *         ),
     *         @OA\Property(
     *           property="email",
     *           description="E-mail user",
     *           type="string",
     *         ),
     *          @OA\Property(
     *           property="password",
     *           description="Password user",
     *           type="string",
     *         ),
     *       ),
     *     ),
     *   ),
     *   @OA\Response(
     *      response=200,
     *      description="successful operation",
     *      @OA\Schema(
     *         type="object",
     *         allOf={@OA\Schema(ref="#definitions/ApiResponse")},
     *         @OA\Property(
     *            property="data",
     *            ref="#/definitions/User",
     *          )
     *     )
     *   ),
     *      security={{"auth": {}}}
     * )
     */
    public function registration(Request $request)
    {
        $validateFields = Validator::make($request->all(), [
            'name'      => ['required', 'string', 'max:255'],
            'email'     => ['required', 'string', 'email', 'max:255', 'unique:users'],
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

    /**
     * @OA\Get(path="/auth/logout",
     *   tags={"Auth"},
     *   summary="Logs out current logged in user session",
     *   description="",
     *   @OA\Response(response="default", description="successful operation")
     * )
     */
    public function logout (Request $request)
    {
        $accessToken = auth()->guard('api')->user()->token();
        DB::table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true
            ]);

        $accessToken->revoke();
        return response()->json(null, 204);
    }


    /**
     *
     * @param Request $request
     * @return Response
     *
     * @OA\Get(
     *      path="/auth/changePassword",
     *      tags={"Auth"},
     *      summary="Change password",
     *      description="Change password",
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
    public function changePassword(Request $request)
    {
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


    /**
     *
     * @param Request $request
     * @return Response
     *
     * @OA\Post(
     *      path="/auth/signInSocialNetwork",
     *      tags={"Auth"},
     *      summary="Sign in useing social network",
     *      description="Sign in useing social network",
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
     *                  @OA\Property(
     *                      property="provider",
     *                      description="Provider through which user sign in",
     *                      type="string",
     *                  ),
     *                  @OA\Property(
     *                      property="provider_id",
     *                      description="Provider id through which user sign in",
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
    public function signInSocialNetwork (Request $request)
    {
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


    /**
     *
     * @param Request $request
     * @return Response
     *
     * @OA\Get(
     *      path="/auth/chanSendLetterForChangePass/{email}",
     *      tags={"Auth"},
     *      summary="Send letter user for changing pasword",
     *      description="Send letter user for changing pasword",
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
     *     @OA\Response(
     *         response=400,
     *         description="Email is not exists. Please check email.",
     *     ),
     *      security={{"auth": {}}}
     * )
     */
    public function sendLetterForChangePassword(Request $request)
    {
        $email = $request->email;
        $userRepo = new UserRepository(new User);
        $user = $userRepo->getUserByEmail($email);
        if (count($user) > 0) {
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

    /**
     *
     * @param Request $request
     * @return Response
     *
     * @OA\Post(
     *      path="/auth/checkTokenUser",
     *      tags={"Auth"},
     *      summary="Validation of the token",
     *      description="Validation of the token",
     *       @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              @OA\Schema(
     *                  @OA\Property(
     *                      property="email",
     *                      description="E-mail user",
     *                      type="string",
     *                  ),
     *                  @OA\Property(
     *                      property="token",
     *                      description="Token user",
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
     *         description="The token is valid",
     *     ),
     *      security={{"auth": {}}}
     * )
     */
    public function checkTokenUser(Request $request)
    {
        $email = $request->get('email');
        $token = $request->get('token');
        $userRepo = new UserRepository(new User);
        $user = $userRepo->getUserByEmail($email);
        if (count($user) > 0) {
            $tokenRepo = new AccessTokenRepository(new OauthAccessToken);
            $oauthToken = $tokenRepo->getAccessTokenByUserIdAndToken($user->getAttribute('id'), $token);
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

    /**
     *
     * @param Request $request
     * @return Response
     *
     * @OA\Post(
     *      path="/auth/newPassword",
     *      tags={"Auth"},
     *      summary="Changed password after forgot password",
     *      description="Changed password after forgot password",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              @OA\Schema(
     *                  @OA\Property(
     *                      property="email",
     *                      description="E-mail user",
     *                      type="string",
     *                  ),
     *                  @OA\Property(
     *                      property="password",
     *                      description="Password user",
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
     *         description="The password is not changed.",
     *     ),
     *      security={{"auth": {}}}
     * )
     */
    public function newPassword(Request $request)
    {
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