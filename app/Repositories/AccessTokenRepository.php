<?php
namespace App\Repositories;
use Jsdecena\Baserepo\BaseRepository;
use App\Models\OauthAccessToken;

class AccessTokenRepository extends BaseRepository {

    public function __construct(OauthAccessToken $tokenAccess) {
        parent::__construct($tokenAccess);
    }

    /**
     * get token by user id
     * @param $idUser
     * @return mixed
     */
    public function getTokenByUserId ($idUser) {
        return OauthAccessToken::where('user_id', $idUser)->first();
    }

    /**
     * update token
     * @param $id
     * @param $token
     * @return mixed
     */
    public function updateOauthAccessToken($id, $token) {
        $oauthToken = OauthAccessToken::find($id);
        $oauthToken->id = $token;
        $oauthToken->created_at = date('Y-m-d H:i:s') ;
        $oauthToken->updated_at = date('Y-m-d H:i:s');
        $oauthToken->expires_at = date('Y-m-d H:i:s', time() + 60 * 60 * 24 * 60);
        return $oauthToken->save();
    }

    public function getTokenByUserIdAndToken($userId, $token) {
        return OauthAccessToken::where('user_id', $userId)->where('id', $token)->first();
    }
}