<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SaleDetail;
use App\Models\Sale;
use Illuminate\Support\Facades\DB;

class SaleController extends Controller
{
    public function store(Request $request)
    {

       
        // Validate the request data
        //   $request->validate([
        //         'customer_id' => 'required|exists:customers,id',
        //         'total_amount' => 'required|numeric',
        //         'products' => 'required|array',
        //         'products.*.id' => 'required|exists:products,id',
        //         'products.*.quantity' => 'required|integer|min:1',
        //       'products.*.price' => 'required|numeric|min:0',
        //   ]);

    //     // Use a database transaction to ensure data integrity
         DB::transaction(function () use ($request) {
    //         // Create the sale record
             $sale = Sale::create([
                'customer_id' => $request->customer_id,
                 'sale_date' => now(),
                 'total_amount' => 0,
             ]);

             $totalAmount = 0;

    //         // Create the sale details records
             foreach ($request->products as $product) {
                $subtotal = $product['price'] * $product['quantity'];
                // Apply fixed amount discount
                $subtotal -= $product['discount_amount'];

                if ($subtotal < 0) {
                    $subtotal = 0;
                }

                $totalAmount += $subtotal;

                 SaleDetail::create([
                     'sale_id' => $sale->id,
                     'product_id' => $product['id'],
                     'quantity' => $product['quantity'],
                     'price' => $product['price'],
                     'discount_amount' => $product['discount_amount'],
                     'subtotal' => $subtotal,
                 ]);
             }
             $sale->update(['total_amount' => $totalAmount]);
         });

         return response()->json(['message' => 'Sale completed successfully'], 201);
     }
}
