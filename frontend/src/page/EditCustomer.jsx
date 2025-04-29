import { useState, useEffect } from "react";
import api from "../api/api"; 
import { useParams } from "react-router";

export const EditCustomer = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const param = useParams()

    const handleUpdateCustomer = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/survey/${param.id}`, {
                nama_customer: username ? username : false,
                email_customer: email ? email : false ,
                no_telp_customer: phoneNumber ? phoneNumber : false
            });
            window.location.href = '/'; 
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Edit Customer</h1>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleUpdateCustomer}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nama Customer</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                // value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email Customer</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                // value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone_number" className="form-label">No Telepon</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone_number"
                                // value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Update</button>
                        <a href="/" className="btn btn-secondary ms-2">Batal</a>
                    </form>
                </div>
            </div>
        </div>
    );
};
