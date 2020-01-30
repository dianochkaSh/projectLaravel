<?php
namespace App\Repositories;
use Jsdecena\Baserepo\BaseRepository;
use App\Models\OauthAccessToken;

class AccessTokenRepository extends BaseRepository {

    public function __construct(OauthAccessToken $tokenAccess)
    {
        parent::__construct($tokenAccess);
    }

    /**
     * Get token by user id
     * @param integer $idUser
     * @return mixed
     */
    public function getTokenByUserId ($idUser)
    {
        return OauthAccessToken::where('user_id', $idUser)->first();
    }

    /**
     * Update token
     * @param integer $id
     * @param string $token
     * @return mixed
     */
    public function updateOauthAccessToken($id, $token)
    {
        $oauthToken = OauthAccessToken::find($id);
        $oauthToken->id = $token;
        $oauthToken->created_at = date('Y-m-d H:i:s') ;
        $oauthToken->updated_at = date('Y-m-d H:i:s');
        $oauthToken->expires_at = date('Y-m-d H:i:s', time() + 60 * 60 * 24 * 60);
        return $oauthToken->save();
    }

    /**
     * Get access token user by userId and token
     * @param integer $userId
     * @param string $token
     * @return mixed
     */
    public function getAccessTokenByUserIdAndToken($userId, $token)
    {
        return OauthAccessToken::where('user_id', $userId)->where('id', $token)->first();
    }
}