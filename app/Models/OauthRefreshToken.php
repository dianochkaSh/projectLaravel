<?php
namespace  App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * Class OauthRefreshToken
 * @package App\Models
 * @property $increment
 * @property $timestamps
 */
class OauthRefreshToken extends Authenticatable {
    public $timestamps = false;
    public $incrementing = false;

}