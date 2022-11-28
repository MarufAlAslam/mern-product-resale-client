import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
    return (
        <div>
            <>
                <h1 className='text-xl text-white font-bold'>Admin Dashboard</h1>
                <div className='divider'></div>
                <ul>
                    <li className='text-white font-bold'>
                        <Link to='/dashboard/all-sellers' className='block w-full p-2 my-2 hover:bg-gray-800'>All Sellers</Link>
                    </li>
                    <li className='text-white font-bold'>
                        <Link to='/dashboard/all-buyers' className='block w-full p-2 my-2 hover:bg-gray-800'>All Buyers</Link>
                    </li>
                    <li className='text-white font-bold'>
                        <Link to='/dashboard/reported-items' className='block w-full p-2 my-2 hover:bg-gray-800'>Reported Items</Link>
                    </li>
                </ul>
            </>
        </div>
    );
};

export default Admin;