<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MedicineController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\AuthApiController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/medicines', [MedicineController::class, 'index']);
Route::post('/medicines', [MedicineController::class, 'store']);
Route::get('/medicines/{id}', [MedicineController::class, 'show']);
Route::put('/medicines/{id}', [MedicineController::class, 'update']);
Route::delete('/medicines/{id}', [MedicineController::class, 'destroy']);

Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);

Route::get('/customers', [CustomerController::class, 'index']);


Route::post('register', [AuthApiController::class, 'register']);
Route::post('login', [AuthApiController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('profile', [AuthApiController::class, 'profile']);
    Route::get('logout', [AuthApiController::class, 'logout']);
        // Uses 'auth' middleware 
    });


