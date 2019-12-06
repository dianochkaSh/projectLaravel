<?php
namespace  App\Repositories;

use Jsdecena\Baserepo\BaseRepository;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

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
            'photo'    => ''
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

    /**
     * update data of user
     * @param $idUser
     * @param $data
     * @return mixed
     */
    public function updateUser ($idUser, $data) {
        $user = User::find($idUser);
        $user->name = $data['name'];
        $user->email = $data['email'];
        return $user->save();
    }

}

