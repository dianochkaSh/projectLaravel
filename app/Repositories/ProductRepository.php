<?php
namespace App\Repositories;
use Illuminate\Database\Eloquent\Model;
use Jsdecena\Baserepo\BaseRepository;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\DB;

class ProductRepository extends BaseRepository {

    public function __construct(Product $product)
    {
        parent::__construct($product);
    }

    /**
     * Get all products
     * @return Product[]|\Illuminate\Database\Eloquent\Collection
     */
    public function getProductList() {
        return Product::all();
    }

    /**
     * Get one product by id
     * @param $id
     * @return mixed
     */
    public function getOneProductById($id) {
        return DB::table('products as p')
                    ->select('p.id', 'p.title', 'p.description', 'p.image', 'p.category_id','p.author', 'c.name')
                    ->join('categories as c', 'c.id', '=', 'p.category_id')
                    ->where('p.id', '=', $id)
                    ->get();
    }
}