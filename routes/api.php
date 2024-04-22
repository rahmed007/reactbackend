<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MedicineController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/medicines', [MedicineController::class, 'index']);
<<<<<<< HEAD
Route::post('/medicines', [MedicineController::class, 'store']);
=======
Route::post('/medicines/create', [MedicineController::class, 'store']);
>>>>>>> 45a1cda3962b4a916d3bbb370e9aacfbc6ee3b6b
