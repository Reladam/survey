<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomersResource;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::all();
        return CustomersResource::collection($customers);
    }

    public function create()
    {
        return view('customers.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_customer' => 'required',
            'email_customer' => 'required|email',
            'no_telp_customer' => 'required',
        ]);


        Customer::create([
            'name' => $request->nama_customer,
            'email' => $request->email_customer,
            'phone_number' => $request->no_telp_customer
        ]);

        return response()->json([
            'status' => 'success'
        ], 200);
    }

    public function edit(Customer $customer)
    {
        return view('customers.edit', compact('customer'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama_customer',
            'email_customer'    ,
            'no_telp_customer',
        ]);

        $findCustomer = Customer::where('id', $id)->first();

        $findCustomer->update([
            'name' => $request->nama_customer  ? $request->nama_customer : $findCustomer->name,
            'email' => $request->email_customer ? $request->email_customer : $findCustomer->email,
            'phone_number' => $request->no_telp_customer ? $request->no_telp_customer : $findCustomer->phone_number
        ]);

        return response()->json([
            'data' => $findCustomer
        ]);

    }

    public function destroy(Customer $customer, $id)
    {
        $findCustomer = Customer::where('id', $id)->first();

        if($findCustomer) {
            $findCustomer->delete();

            return response()->json([
                'status' => 'delete success'
            ]);
        }
    }
}
