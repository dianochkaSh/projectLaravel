<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\ProductRepository;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use App\Models\Category;
use App\Repositories\CategoryRepository;
use App\Models\Author;
use App\Repositories\AuthorRepository;


class ProductController extends Controller
{
    /**
     *
     * @param Request $request
     * @param $priceMin
     * @param $priceMax
     * @param $categories
     * @param $author
     * @return Response
     *
     * @OA\Get(
     *      path="/products/list",
     *      tags={"Product"},
     *      summary="Get information about products",
     *      description="Get information about products",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\Schema(
     *              type="object",
     *              allOf={@OA\Schema(ref="#definitions/ApiResponse")},
     *              @OA\Property(
     *                  property="data",
     *                  ref="#/definitions/Product",
     *              )
     *          )
     *      )
     * )
     */
    public function get($priceMin = 0, $priceMax = 0, $categories = 0,  $author = 0, Request $request) {
        $productRepo = new ProductRepository(new Product);
        $products = $productRepo->getProductList($priceMin, $priceMax, $categories, $author);
        foreach ($products as $product) {
            $image = Storage::disk('public')->url($product->getAttribute('image'));
            $product->setAttribute('image', $image);
        }
        return response()->json($products, 200);
    }


    /**
     *
     * @param Request $request
     * @return Response
     *
     * @OA\Get(
     *      path="/products/getOneProduct/{id}",
     *      tags={"Product"},
     *      summary="Get information about one product",
     *      description="Get information about one product",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\Schema(
     *              type="object",
     *              allOf={@OA\Schema(ref="#definitions/ApiResponse")},
     *              @OA\Property(
     *                  property="data",
     *                  ref="#/definitions/Product",
     *              )
     *          )
     *      )
     * )
     */
    public function getOneProduct(Request $request) {
        $productRepo = new ProductRepository(new Product);
        $product = $productRepo->getOneProductById($request->id);
        if ($product) {
            $image = Storage::disk('public')->url($product->image);
            $product->image = $image;
            return response()->json($product, 200);
        } else {
            return response()->json(['error' => 'The Book do not find.' ], 400);
        }

    }

    /**
     *
     * @param Request $request
     * @return Response
     *
     * @OA\Get(
     *      path="/product/allCategories",
     *      tags={"Product"},
     *      summary="Get all categories",
     *      description="Get all categories",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\Schema(
     *              type="object",
     *              allOf={@OA\Schema(ref="#definitions/ApiResponse")},
     *              @OA\Property(
     *                  property="data",
     *                  ref="#/definitions/Product",
     *              )
     *          )
     *      )
     * )
     */
    public function getAllCategories(Request $request) {
        $categoryRepo = new CategoryRepository(new Category);
        $categories = $categoryRepo->getAllCategory();
        return response()->json($categories, 200);
    }

    /**
     *
     * @param Request $request
     * @return Response
     *
     * @OA\Get(
     *      path="/product/allAuthor",
     *      tags={"Product"},
     *      summary="Get all authors",
     *      description="Get all authors",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\Schema(
     *              type="object",
     *              allOf={@OA\Schema(ref="#definitions/ApiResponse")},
     *              @OA\Property(
     *                  property="data",
     *                  ref="#/definitions/Product",
     *              )
     *          )
     *      )
     * )
     */
    public function getAllAuthors(Request $request) {
        $authorRepo = new AuthorRepository(new Author);
        $authors = $authorRepo->getAllAuthors();
        return response()->json($authors, 200);

    }
}
