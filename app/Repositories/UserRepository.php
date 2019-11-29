<?php
namespace  App\Repositories;

use Jsdecena\Baserepo\BaseRepository;
use App\Models\User;

class UserRepository extends BaseRepository {

    public function __construct(User $user) {
        parent::__construct($user);
    }

    /**
     * Create user
     * @param $data, array data of user(name, email, password)
     * @return mixed
     */
    public function createUser ($data) {
        return User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }

    /**
     * Update photo user
     * @param $idUser - id user
     * @param $urlPhoto - path photo user
     * @return mixed
     */
    public function updatePhoto($idUser, $urlPhoto) {
       $user = User::find($idUser);
       $user->photo = $urlPhoto;
      return $user->save();
    }

}

