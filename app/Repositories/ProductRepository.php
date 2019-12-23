<?php
namespace App\Repositories;
use Illuminate\Database\Eloquent\Model;
use Jsdecena\Baserepo\BaseRepository;
use App\Models\Product;

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
        return Product::find((int)$id);
    }
}