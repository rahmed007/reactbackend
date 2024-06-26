<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    public function stock()
    {
        return $this->hasOne(Stock::class);
    }

    public function purchases()
    {
        return $this->hasMany(PurchaseDetail::class);
    }
}
