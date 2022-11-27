import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Utils/Contexts/AuthProvider';
import { FaEdit, FaTrash, FaCheckSquare } from 'react-icons/fa'
import './MyProducts.css'

const MyProducts = () => {
    const { user } = useContext(AuthContext)
    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => fetch(`http://localhost:5000/productsforseller/?email=${user.email}`)
            .then(res => res.json())
    })
    return (
        <div>
            <h3 className='text-center font-bold text-2xl'>
                My Products
            </h3>

            {
                isLoading ?
                    (
                        <div className='flex justify-center items-center w-full my-6'>
                            <progress className="progress w-56 mx-auto"></progress>
                        </div>
                    )
                    :
                    (
                        <div className='lg:overflow-x-hidden overflow-x-auto'>
                            <table className='w-full mt-6 text-center'>
                                <thead>
                                    <tr className='bg-black text-white'>
                                        <th className='px-4 py-4 border-b-2'>Product Image</th>
                                        <th className='px-4 py-4 border-b-2'>Product Name</th>
                                        <th className='px-4 py-4 border-b-2'>Product Price</th>
                                        <th className='px-4 py-4 border-b-2'>Product Category</th>
                                        <th className='px-4 py-4 border-b-2'>Edit</th>
                                        <th className='px-4 py-4 border-b-2'>Delete</th>
                                        <th className='px-4 py-4 border-b-2'>Advertise</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        products.map(product => (
                                            <tr key={product._id}>
                                                <td className='px-4 py-4'>
                                                    <img src={product.img} alt="" className='w-20 h-20 m-auto' />
                                                </td>
                                                <td className='px-4 py-4'>
                                                    {product.name}
                                                </td>
                                                <td className='px-4 py-4'>
                                                    {product.price}
                                                </td>
                                                <td className='px-4 py-4'>
                                                    {product.category}
                                                </td>
                                                <td>
                                                    <button className='bg-secondary px-4 py-2 rounded-md text-black'>
                                                        <FaEdit />
                                                    </button>
                                                </td>
                                                <td>
                                                    <button className='bg-red-500 text-black px-4 py-2 rounded-md'>
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                                <td>
                                                    <button className='bg-primary text-black px-4 py-2 rounded-md'>
                                                        <FaCheckSquare />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
            }
        </div>
    );
};

export default MyProducts;