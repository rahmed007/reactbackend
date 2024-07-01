<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;

    protected $fillable = [
        'purchase_date',
        'total_amount',
        // Add other fillable fields as needed
    ];

    public function purchaseDetails()
    {
        return $this->hasMany(PurchaseDetail::class);
    }
}
