<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;

Route::post('/survey', [CustomerController::class, 'store']);
Route::put('/survey/{id}', [CustomerController::class, 'update']);
Route::delete('/survey/{id}', [CustomerController::class, 'destroy']);
Route::get('/survey', [CustomerController::class, 'index']);
