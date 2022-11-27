import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { AuthContext } from '../../Utils/Contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    // const userData = useLoaderData()/
    const { user } = useContext(AuthContext)
    const { email } = user
    const url = `http://localhost:5000/user?email=${user.email}`
    const [role, setRole] = useState('user')
    const navigate = useNavigate()
    console.log(email, url)

    useEffect(() => {
        axios.get(url)
            .then(res => setRole(res.data.role))
    }, [url])

    return (
        <div>
            {
                user.email ? (
                    role === 'seller' ? (
                        "Welcome"
                    )
                        :
                        navigate('/dashboard')
                ) : (<h1>Not Logged In</h1>)
            }
        </div>
    );
};

export default AddProduct;