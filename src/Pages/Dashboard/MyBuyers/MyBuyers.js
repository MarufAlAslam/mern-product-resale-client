import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Utils/Contexts/AuthProvider';
import Buyers from './Buyers/Buyers';

const MyBuyers = () => {
    // const userData = useLoaderData()/
    const { user } = useContext(AuthContext)
    const { email } = user
    const url = `https://e-trade-server-phi.vercel.app/user?email=${user.email}`
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
                        <Buyers></Buyers>
                    )
                        :
                        navigate('/dashboard')
                ) : (<h1>Not Logged In</h1>)
            }
        </div>
    );
};

export default MyBuyers;