import React, { useContext, useEffect } from 'react';
import axios from "axios";
import { AuthContext } from '../Contexts/AuthProvider';



const SellerRoute = () => {
    const { user } = useContext(AuthContext)
    const url = `https://e-trade-server-phi.vercel.app/user?email=${user.email}`

    useEffect(() => {
        axios.get(url)
            .then(res => console.log(res.data))
    }, [url])
    return (
        <div>

        </div>
    );
};

export default SellerRoute;