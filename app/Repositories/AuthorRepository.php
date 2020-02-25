<?php
namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use Jsdecena\Baserepo\BaseRepository;
use App\Models\Author;

class AuthorRepository extends BaseRepository
{
    public function __construct(Author $author)
    {
        parent::__construct($author);
    }

    /**
     * Get all authors
     * @return Author[]|\Illuminate\Database\Eloquent\Collection
     */
    public function getAllAuthors()
    {
        return Author::all();
    }
}
