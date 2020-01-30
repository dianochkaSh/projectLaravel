<?php
namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use Jsdecena\Baserepo\BaseRepository;
use App\Models\Category;

class CategoryRepository extends BaseRepository {

    public function __construct(Category $category)
    {
        parent::__construct($category);
    }

    /**
     * Get all categories
     * @return Category[]|\Illuminate\Database\Eloquent\Collection
     */
    public function getAllCategory()
    {
        return Category::all();
    }
}