<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\ProductRepository;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     *
     * @param Request $request
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
    public function get() {
        $productRepo = new ProductRepository(new Product);
        $products = $productRepo->getProductList();
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
        return response()->json($product, 200);
    }
}
