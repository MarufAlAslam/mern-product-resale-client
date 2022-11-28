import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../../Utils/Contexts/AuthProvider';
import './Buyers.css'

const Buyers = () => {
    // fetch data from bookings
    const { user } = useContext(AuthContext)
    const { data: bookings = [] } = useQuery({
        queryKey: 'bookings',
        queryFn: () => fetch(`https://e-trade-server-phi.vercel.app/bookings?email=${user.email}`,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        ).then(res => res.json())
    })
    return (
        <div className='lg:w-5/6 w-full mx-auto py-10'>
            <h3 className='font-bold text-center text-2xl'>
                My Buyers
            </h3>

            {
                bookings.length > 0 ?
                    (
                        <table className='table w-full border-none text-center'>
                            <thead>
                                <tr>
                                    <th className='border px-4 py-2'>Buyer's Name</th>
                                    <th className='border px-4 py-2'>Buyer's Email</th>
                                    <th className='border px-4 py-2'>Buyer's Phone</th>
                                    <th className='border px-4 py-2'>Buyer's Location</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    bookings.map(booking => (
                                        <tr key={booking._id}>
                                            <td className='border px-4 py-2'>{booking.username}</td>
                                            <td className='border px-4 py-2'>{booking.email}</td>
                                            <td className='border px-4 py-2'>{booking.mobile}</td>
                                            <td className='border px-4 py-2'>{booking.location}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    )
                    :
                    (
                        <p className='py-10 text-center'>
                            No Data
                        </p>
                    )
            }
        </div>
    );
};

export default Buyers;