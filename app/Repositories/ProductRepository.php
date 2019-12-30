<?php
namespace App\Repositories;
use Illuminate\Database\Eloquent\Model;
use Jsdecena\Baserepo\BaseRepository;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
        $author = !empty($author) ? explode(",", $author) : '';
        $categories = !empty($categories) ? explode(",", $categories) : '';
        $query = Product::with(['author',
            'category',
            'images' => function (HasMany $query) {
                        $query->where('order', '=', 1);
            }]);

        if (is_array($author) && count($author) > 0) {
            $query->whereIn('products.author_id', $author);
        }
        if ( is_array($categories) && count($categories) > 0) {
            $query->whereIn('products.category_id', $categories);
        }

        if (!empty($priceMin)) {
            $query->where('products.price', '>', $priceMin );
        }
        if (!empty($priceMax)) {
            $query->where('products.price', '<', $priceMax );
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
        return Product::with([
                    'category',
                    'author',
                    'images' => function (HasMany $query) {
                        $query->where('image_type', 'like', "%gallery%");
                        $query->orderBy('order', 'asc');
                    }
                ])
            ->find($id);
    }
}