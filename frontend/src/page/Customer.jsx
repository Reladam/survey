import { useCallback, useEffect, useState } from "react"
import { AppLayout } from "../Layouts/AppLayout"
import api from "../api/api";

export const GetCustomer = () => {

    const [dataCustomers, setCustomers] = useState([]);

    const FetchCustomers = useCallback(async () => {
        try {
            const res = await api.get('/survey');
            setCustomers(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }, [dataCustomers])

    useEffect(() => {
        FetchCustomers()
    }, [FetchCustomers])

    const handleDeleteCustomer = async (id) => {
        try {
            await api.delete(`/survey/${id}`);
            FetchCustomers();
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="container mt-5">
            <h1>Daftar Customer</h1>

            {/* @if (session('success'))
        <div className="alert alert-success">{{ session('success') }}</div>
    @endif */}

            <a href="/survey/create" className="btn btn-primary mb-3">Tambah Customer</a>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Customer</th>
                        <th>Email Customer</th>
                        <th>No Telepon</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {dataCustomers.map((item, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>
                                <a href={`/survey/${item.id}`} className="btn btn-warning btn-sm">Edit</a>

                                <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDeleteCustomer(item.id)}>Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export const CreateCustomer = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('')


    const handleCreateCustomer = async (e) => {
        e.preventDefault()
        try {
            await api.post('/survey', {
                'nama_customer': username,
                'email_customer': email,
                'no_telp_customer': phoneNumber
            })
            return window.location.href = '/'
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className="container mt-5">
            <h1 className="mb-4">Tambah Customer</h1>

            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleCreateCustomer}>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nama Customer</label>
                            <input type="text" name="name" className="form-control" id="name" onChange={(e) => setUsername(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email Customer</label>
                            <input type="email" name="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone_number" className="form-label">No Telepon</label>
                            <input type="text" name="phone_number" className="form-control" id="phone_number" onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>

                        <button type="submit" className="btn btn-primary">Simpan</button>
                        <a href="{{ route('customers.index') }}" className="btn btn-secondary">Batal</a>
                    </form>
                </div>
            </div>
        </div>
    )
}