<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * Class OauthAccessToken
 * @package App\Models
 * @property $increment
 * @property $timestamps
 */
class OauthAccessToken extends Authenticatable {
    public $incrementing = false;
    public $timestamps = false;

}