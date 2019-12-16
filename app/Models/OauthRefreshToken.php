<?php
namespace  App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable;

class OauthRefreshToken extends Authenticatable {
    public $timestamps = false;
    public $incrementing = false;

}