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
    public function getProductList($priceMin, $priceMax, $categories, $author) {
        $query = Product::query();
        if ($author !== 0) {
            $query->leftJoin('authors as a', 'a.id', '=', 'products.author_id' );
            $query->where('products.author_id', $author);
        }
        if ($categories !== 0) {
            $query->leftJoin('categories as c', 'c.id', '=', 'products.category_id' );
            $query->where('products.category_id','=',1);
        }

        return $query->get();
    }

    /**
     * Get one product by id
     * @param $id
     * @return mixed
     */
    public function getOneProductById($id)
    {
       return Product::with('category', 'author')->find($id);
    }
}