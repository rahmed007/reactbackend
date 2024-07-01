<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vendor;

class VendorController extends Controller
{
    public function index()
    {
        $vendors = Vendor::all();
        return response()->json($vendors);
    }

    public function store(Request $request)
    {
        $vendor = new Vendor;
        $vendor->name = $request->name;
        $vendor->contact = $request->contact;
        $vendor->address = $request->address;
        $vendor->save();

        return response()->json([
            'message'=> 'vendor added'
        ], 201);

    }

    public function show($id)
    {
        $vendor = Vendor::find($id);
        if(!empty($vendor))
    {
            return response()->json($vendor);
        }
        else
        {
            return response()->json([
                "message"=>"vendor not found"
            ], 404);
        }
    }

    public function update(Request $request, $id)
    {
        if(Vendor::where('id', $id)->exists())
        {
            $vendor = Vendor::find($id);
            $vendor->name = is_null($request->name) ? $vendor->name:$request->name;
            $vendor->contact = is_null($request->contact) ? $vendor->contact:$request->contact;
            $vendor->address = is_null($request->address) ? $vendor->address:$request->address;

            $vendor->save();

            return response()->json([
                "message"=> "Vendor Updated"
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
        $vendor = Vendor::findOrFail($id);
        $vendor->delete();

        return response()->json(['message' => 'Vendor deleted successfully']);
    }
}
