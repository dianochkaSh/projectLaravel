<?php
namespace  App\Models;
use Illuminate\Database\Eloquent\Model;

/**
 * Class OauthRefreshToken
 * @package App\Models
 * @property $increment
 * @property $timestamps
 */
class OauthRefreshToken extends Model
{
    public $timestamps = false;
    public $incrementing = false;

}