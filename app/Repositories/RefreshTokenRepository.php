<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use Jsdecena\Baserepo\BaseRepository;
use App\Models\OauthRefreshToken;

class RefreshTokenRepository extends BaseRepository {
    public $incrementing = false;

    public function __construct(OauthRefreshToken $refreshToken)
    {
        parent::__construct($refreshToken);
    }


//    public function insertRefreshToken($tokenNew) {
//        $refreshToken =  new OauthRefreshToken;
//        $refreshToken->access_token_id = $tokenNew;
//        $refreshToken->revoked = false;
//        $refreshToken->expires_at = date('Y-m-d H:i:s', time() + 60 * 60 * 24 * 60);
//        return $refreshToken->save();
//    }

    public function updateRefreshToken ($tokenOld, $tokenNew ) {
        OauthRefreshToken::where('access_token_id', $tokenOld)->update(
            array(
                'revoked'           => false,
                'access_token_id'   => $tokenNew,
                'expires_at'        => date('Y-m-d H:i:s', time() + 60 * 60 * 24 * 60)
            )
        );
    }
}