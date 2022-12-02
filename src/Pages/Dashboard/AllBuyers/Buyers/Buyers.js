import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';

const Buyers = () => {
    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: () => fetch('https://e-trade-server-phi.vercel.app/users')
            .then(res => res.json())
    })

    console.log(users)
    const makeSeller = (email) => {
        fetch(`https://e-trade-server-phi.vercel.app/users?email=${email}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: 'seller' })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    refetch()
                    toast.success('User upgraded to Seller Successfully')
                }
            })
    }

    const makeAdmin = (email) => {
        fetch(`https://e-trade-server-phi.vercel.app/users?email=${email}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: 'admin' })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    refetch()
                    toast.success('Seller Made Admin Successfully')
                }
            })
    }



    return (
        <div className='py-10 lg:w-5/6 w-full mx-auto'>
            {
                isLoading ? (
                    <h3>Loading...</h3>
                )
                    :
                    (
                        users.length > 0 ? (
                            // filter and show only sellers
                            <div className='lg:overflow-x-hidden overflow-x-auto'>
                                <table className='table w-full text-center'>
                                    <thead>
                                        <tr>
                                            <th className='border px-4 py-2'>Buyer's Name</th>
                                            <th className='border px-4 py-2'>Buyer's Email</th>
                                            <th className='border px-4 py-2'>Make Seller</th>
                                            <th className='border px-4 py-2'>Make Admin</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            users.filter(user => user.role === 'user').map(user => (
                                                <tr key={user._id}>
                                                    <td className='border px-4 py-2'>
                                                        {user.email.split('@')[0]}
                                                    </td>
                                                    <td className='border px-4 py-2'>{user.email}</td>
                                                    <td className='border px-4 py-2'>
                                                        <button onClick={() => makeSeller(user.email)} className='btn-secondary text-white px-4 py-2 rounded'>
                                                            Make Seller
                                                        </button>
                                                    </td>
                                                    <td className='border px-4 py-2'>
                                                        <button onClick={() => makeAdmin(user.email)} className='bg-green-500 text-white px-4 py-2 rounded'>
                                                            Make Admin
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))

                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                            :
                            "NO Sellers"
                    )
            }

            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Buyers;