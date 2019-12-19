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
     * @param array $data, data of user(name, email, password)
     * @return mixed
     */
    public function createUser ($data) {
        return User::create([
            'name'          => $data['name'],
            'email'         => $data['email'],
            'password'      => Hash::make($data['password']),
            'photo'         => $data['photo'],
            'provider'      => $data['provider'],
            'provider_id'   => $data['provider_id']
        ]);
    }

    /**
     * Update photo user
     * @param integer $idUser - id user
     * @param string $urlPhoto - path photo user
     * @return mixed
     */
    public function updatePhoto($idUser, $urlPhoto) {
       $user = User::find($idUser);
       $user->photo = $urlPhoto;
      return $user->save();
    }

    /**
     * Update data of user
     * @param integer $idUser
     * @param array $data
     * @return mixed
     */
    public function updateUser ($idUser, $data) {
        $user = User::find($idUser);
        $user->name = $data['name'];
        $user->email = $data['email'];
        return $user->save();
    }

    /**
     * Check exist user, by provider id
     * @param $providerId
     * @return mixed
     */
    public function getUserByProviderId($providerId) {
       return User::where('provider_id', $providerId)->exists();
    }

    /**
     * Get user by email
     * @param string $email
     * @return mixed
     */
    public function getUserByEmail ($email) {
        return User::where('email', $email)->first();
    }

    public function updatePassword ($id, $password) {
        return User::find($id)->update(array('password' => $password));
    }

}

