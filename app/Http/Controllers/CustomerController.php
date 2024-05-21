<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::all();
        return response()->json($customers);
    }

    public function store(Request $request)
    {
        $product = new Customer;
        $product->customer_type = $request->customer_type;
        $product->name = $request->name;
        $product->contact = $request->contact;
        $product->address = $request->address;
        $product->save();

        return response()->json([
            'message'=> 'customer added'
        ], 201);

    }

    public function show($id)
    {
        $product = Customer::find($id);
        if(!empty($product))
    {
            return response()->json($product);
        }
        else
        {
            return response()->json([
                "message"=>"customer not found"
            ], 404);
        }
    }

    public function update(Request $request, $id)
    {
        if(Customer::where('id', $id)->exists())
        {
            $product = Customer::find($id);
            $product->customer_type = is_null($request->customer_type) ? $product->customer_type:$request->customer_type;
            $product->name = is_null($request->name) ? $product->name:$request->name;
            $product->contact = is_null($request->contact) ? $product->contact:$request->contact;
            $product->address = is_null($request->address) ? $product->address:$request->address;

            $product->save();

            return response()->json([
                "message"=> "Customer Updated"
            ], 404);
        }
        else
        {
            return response()->json([
                "message"=>"Customer Not Found"
            ], 404);
        }
    }

    public function destroy($id)
    {
        $product = Customer::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Customer deleted successfully']);
    }
}
