<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Medicine;

class MedicineController extends Controller
{
    public function index()
    {
        $medicines = Medicine::all();
        return response()->json($medicines);
    }

    public function store(Request $request)
    {
        $medicine = new Medicine;
        $medicine->name = $request->name;
        $medicine->formula = $request->formula;
        $medicine->manufacturer = $request->manufacturer;
        $medicine->expiry_date = $request->expiry_date;
        $medicine->save();

        return response()->json([
            'message'=> 'medicine added'
        ], 201);

    }

    public function show($id)
    {
        $medicine = Medicine::find($id);
        if(!empty($medicine))
        {
            return response()->json($medicine);
        }
        else
        {
            return response()->json([
                "message"=>"medicine not found"
            ], 404);
        }
    }

    public function update(Request $request, $id)
    {
        if(Medicine::where('id', $id)->exists())
        {
            $medicine = Medicine::find($id);
            $medicine->name = is_null($request->name) ? $medicine->name:$request->name;
            $medicine->formula = is_null($request->formula) ? $medicine->name:$request->formula;
            $medicine->manufacturer = is_null($request->manufacturer) ? $medicine->name:$request->manufacturer;
            $medicine->expiry_date = is_null($request->expiry_date) ? $medicine->name:$request->expiry_date;

            $medicine->save();

            return response()->json([
                "message"=> "Medicine Updates"
            ], 404);
        }
        else
        {
            return response()->json([
                "message"=>"Medicine Not Found"
            ], 404);
        }
    }

    public function destroy($id)
    {
        $medicine = Medicine::findOrFail($id);
        $medicine->delete();

        return response()->json(['message' => 'Medicine deleted successfully']);
    }
}
