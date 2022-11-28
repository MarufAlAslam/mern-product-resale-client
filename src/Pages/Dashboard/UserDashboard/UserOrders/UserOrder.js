import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../Utils/Contexts/AuthProvider';

const UserOrder = () => {
    const { user } = useContext(AuthContext)
    const { data: bookingData = [] } = useQuery({
        queryKey: ['bookingData'],
        queryFn: () => fetch(`https://e-trade-server-phi.vercel.app/buyerbookings?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
    })
    return (
        <div>
            <h2 className='mb-8 text-2xl font-bold text-center'>
                My Orders
            </h2>
            <table className='w-full text-center'>
                <thead>
                    <tr className='border-b-2'>
                        <th className='p-2'>#</th>
                        <th className='p-2'>Product Img</th>
                        <th className='text-white font-bold'>Product Name</th>
                        <th className='text-white font-bold'>Price</th>
                        <th className='text-white font-bold'>Seller's Email</th>
                        <th className='text-white font-bold'>Meeting Location</th>
                        <th className='text-white font-bold'>Payment Status</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        bookingData.map((booking, index) => (
                            <tr key={booking._id}>
                                <td className='p-2'>{index + 1}</td>
                                <td className='p-2'>
                                    <img src={booking.productimg} alt="" className='w-20 h-20 object-cover m-auto' />
                                </td>
                                <td className='text-white p-4'>{booking.productname}</td>
                                <td className='text-white p-4'>${booking.price}</td>
                                <td className='text-white p-4'>{booking.selleremail}</td>
                                <td className='text-white p-4'>{booking.location}</td>
                                <td className='text-white p-4'>
                                    {
                                        booking.isPaid ?
                                            (
                                                <span className='text-green-500 font-bold'>Paid</span>
                                            )
                                            :
                                            (
                                                <Link to={`/dashboard/payment/${booking._id}`} className='btn btn-primary btn-sm py-2 rounded-md text-black'>Pay</Link>
                                            )
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default UserOrder;