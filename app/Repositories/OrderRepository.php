<?php
namespace App\Repositories;

use Jsdecena\Baserepo\BaseRepository;
use App\Models\Order;

class OrderRepository extends BaseRepository {

    public function __construct(Order $order)
    {
        parent::__construct($order);
    }
}