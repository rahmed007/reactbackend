<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;
    protected $fillable = ['customer_id', 'sale_date', 'total_amount'];

    // Define the relationship with Customer
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    // Define the relationship with SaleDetail (if necessary)
    public function saleDetails()
    {
        return $this->hasMany(SaleDetail::class);
    }
}
