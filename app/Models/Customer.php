<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = ['customer_type', 'name', 'contact', 'address'];

    // Define the inverse relationship with Sale
    public function sales()
    {
        return $this->hasMany(Sale::class);
    }
}
