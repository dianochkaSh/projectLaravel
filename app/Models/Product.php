<?php
namespace App\Models;

use App\Models\Category;
use App\Models\Author;
use Illuminate\Database\Eloquent\Model;

class Product extends Model {

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    public function images() {
        return $this->hasMany(ProductImage::class);
    }
}