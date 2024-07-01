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
        $customer = new Customer;
        $customer->customer_type = $request->customer_type;
        $customer->name = $request->name;
        $customer->contact = $request->contact;
        $customer->address = $request->address;
        $customer->save();

        return response()->json([
            'message'=> 'customer added'
        ], 201);

    }

    public function show($id)
    {
        $customer = Customer::find($id);
        if(!empty($customer))
    {
            return response()->json($customer);
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
            $customer = Customer::find($id);
            $customer->customer_type = is_null($request->customer_type) ? $customer->customer_type:$request->customer_type;
            $customer->name = is_null($request->name) ? $customer->name:$request->name;
            $customer->contact = is_null($request->contact) ? $customer->contact:$request->contact;
            $customer->address = is_null($request->address) ? $customer->address:$request->address;

            $customer->save();

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
        $customer = Customer::findOrFail($id);
        $customer->delete();

        return response()->json(['message' => 'Customer deleted successfully']);
    }
}
