import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Utils/Contexts/AuthProvider';

const Dashboard = () => {
    const { user } = useContext(AuthContext)
    const { data: loggedInUser = [], isLoading } = useQuery(
        {
            queryKey: ['loggedInUser'],
            queryFn: () => fetch(`http://localhost:5000/user?email=${user.email}`)
                .then(res => res.json())

        }
    )
    return (
        <div className='lg:flex'>
            <div className='xl:w-1/5 lg:2/5 w-full min-h-screen bg-gray-700 p-5'>
                {
                    loggedInUser.role === 'admin' ?
                        <>
                            <h1 className='text-xl text-white font-bold'>Admin Dashboard</h1>
                            <div className='divider'></div>
                            <ul>
                                <li className='text-white font-bold'>
                                    <Link to='/all-sellers' className='block w-full p-2 my-2 hover:bg-gray-800'>All Sellers</Link>
                                </li>
                                <li className='text-white font-bold'>
                                    <Link to='/all-buyers' className='block w-full p-2 my-2 hover:bg-gray-800'>All Buyers</Link>
                                </li>
                                <li className='text-white font-bold'>
                                    <Link to='/reported-items' className='block w-full p-2 my-2 hover:bg-gray-800'>Reported Items</Link>
                                </li>
                            </ul>
                        </>
                        :
                        loggedInUser.role === 'seller' ?
                            <>
                                <h1 className='text-xl text-white font-bold'>Seller Dashboard</h1>
                                <div className='divider'></div>
                                <ul>
                                    <li className='text-white font-bold'>
                                        <Link to='/add-product' className='block w-full p-2 my-2 hover:bg-gray-800'>Add a Product</Link>
                                    </li>
                                    <li className='text-white font-bold'>
                                        <Link to='/my-product' className='block w-full p-2 my-2 hover:bg-gray-800'>My Products</Link>
                                    </li>
                                    <li className='text-white font-bold'>
                                        <Link to='/my-buyers' className='block w-full p-2 my-2 hover:bg-gray-800'>My Buyers</Link>
                                    </li>
                                </ul>
                            </>
                            :
                            <>
                                <h1 className='text-xl text-white font-bold'>User Dashboard</h1>
                                <div className='divider'></div>
                                <ul>
                                    <li className='text-white font-bold'>
                                        <Link to='/my-orders' className='block w-full p-2 my-2 hover:bg-gray-800'>My Orders</Link>
                                    </li>
                                </ul>
                            </>
                }
            </div>
            <div className='p-8'>
                {
                    isLoading ?
                        (
                            <div className='flex justify-center items-center w-full my-6'>
                                <progress className="progress w-56 mx-auto"></progress>
                            </div>
                        )
                        :
                        (
                            <div className='text-right'>
                                You are logged in as a {loggedInUser.role}
                            </div>
                        )
                }
            </div>
        </div>
    );
};

export default Dashboard;