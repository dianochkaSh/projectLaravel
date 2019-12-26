<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class OauthAccessToken
 * @package App\Models
 * @property $increment
 * @property $timestamps
 */
class OauthAccessToken extends Model {
    public $incrementing = false;
    public $timestamps = false;

}