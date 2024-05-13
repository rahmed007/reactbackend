<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $product = new Product;
        $product->category = $request->category;
        $product->barcode = $request->barcode;
        $product->product_name = $request->product_name;
        $product->description = $request->description;
        $product->manufacturer = $request->manufacturer;
        $product->rack_location = $request->rack_location;
        $product->purchase_price = $request->purchase_price;
        $product->retail_price = $request->retail_price;
        $product->expiry_date = $request->expiry_date;
        $product->save();

        return response()->json([
            'message'=> 'product added'
        ], 201);

    }

    public function show($id)
    {
        $product = Product::find($id);
        if(!empty($product))
    {
            return response()->json($product);
        }
        else
        {
            return response()->json([
                "message"=>"product not found"
            ], 404);
        }
    }

    public function update(Request $request, $id)
    {
        if(Product::where('id', $id)->exists())
        {
            $product = Product::find($id);
            $product->category = is_null($request->category) ? $product->category:$request->category;
            $product->barcode = is_null($request->barcode) ? $product->barcode:$request->barcode;
            $product->product_name = is_null($request->product_name) ? $product->product_name:$request->product_name;
            $product->description = is_null($request->description) ? $product->description:$request->description;
            $product->manufacturer = is_null($request->manufacturer) ? $product->manufacturer:$request->manufacturer;
            $product->rack_location = is_null($request->rack_location) ? $product->rack_location:$request->rack_location;
            $product->purchase_price = is_null($request->purchase_price) ? $product->purchase_price:$request->purchase_price;
            $product->retail_price = is_null($request->retail_price) ? $product->retail_price:$request->retail_price;
            $product->expiry_date = is_null($request->expiry_date) ? $product->name:$request->expiry_date;

            $product->save();

            return response()->json([
                "message"=> "Product Updated"
            ], 404);
        }
        else
        {
            return response()->json([
                "message"=>"Product Not Found"
            ], 404);
        }
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
