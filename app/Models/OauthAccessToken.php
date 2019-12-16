<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
class OauthAccessToken extends Authenticatable {
    public $incrementing = false;
    public $timestamps = false;

}