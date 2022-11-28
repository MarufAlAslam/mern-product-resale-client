import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Utils/Contexts/AuthProvider';
import { FaEdit, FaTrash, FaCheckSquare, FaRecycle, FaArrowUp } from 'react-icons/fa'
import './MyProducts.css'
import { toast, ToastContainer } from 'react-toastify';

const MyProducts = () => {
    const { user } = useContext(AuthContext)
    const [status, setStatus] = useState('available')
    const [newPrice, setNewPrice] = useState('')
    const [isAdvertisement, setIsAdvertisement] = useState("no")
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: () => fetch(`https://e-trade-server-phi.vercel.app/productsforseller/?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
    })
    const changeStatus = (id) => {
        if (status === 'available') {
            setStatus('sold')
        }
        else {
            setStatus('available')
        }

        fetch(`https://e-trade-server-phi.vercel.app/products/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: status })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    refetch()
                    toast.success('Status updated successfully')
                }
                else {
                    toast.error('Something went wrong')
                }
            })
    }

    const handleAdvertisement = (id) => {
        if (isAdvertisement === 'no') {
            setIsAdvertisement('yes')
        }
        else {
            setIsAdvertisement('no')
        }
        fetch(`https://e-trade-server-phi.vercel.app/advertise/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ isAdvertise: isAdvertisement })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    refetch()
                    toast.success('Product added to advertisement')
                }
                else {
                    toast.error('Something went wrong')
                }
            })
    }


    const changePrice = (event) => {
        event.preventDefault()
        const priceForm = event.target
        const newPrice = priceForm.newprice.value
        setNewPrice(newPrice)
        console.log(newPrice)
    }

    const updatePrice = (id) => {
        fetch(`https://e-trade-server-phi.vercel.app/updateprice/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ price: newPrice })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    refetch()
                    toast.success('Price updated successfully')
                }
                else {
                    toast.error('Something went wrong')
                }
            })
    }

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
                                        <th className='px-4 py-4 border-b-2'>Change Status</th>
                                        <th className='px-4 py-4 border-b-2'>Edit</th>
                                        <th className='px-4 py-4 border-b-2'>Delete</th>
                                        <th className='px-4 py-4 border-b-2'>Advertised?</th>
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
                                                    <form onSubmit={changePrice}>
                                                        <div className='input-group'>

                                                            <input type="text" defaultValue={product.price} name="newprice" className="input  text-center" />
                                                            <button className='btn bg-green-600' onClick={() => updatePrice(product._id)}>
                                                                <FaArrowUp />
                                                            </button>

                                                        </div>
                                                    </form>
                                                </td>
                                                <td className='px-4 py-4'>
                                                    {product.category}
                                                </td>
                                                <td>
                                                    <p className='flex flex-row items-center justify-center'>
                                                        {product.status}
                                                        <button onClick={() => changeStatus(product._id)} className='bg-secondary px-4 py-2 rounded-md text-black ml-2'>
                                                            <FaRecycle />
                                                        </button>
                                                    </p>
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
                                                    <div className='flex justify-center items-center'>
                                                        <p>
                                                            {product.isAdvertise}
                                                        </p>
                                                        {
                                                            product.status === 'available' &&
                                                            <button onClick={() => handleAdvertisement(product._id)} className='bg-primary ml-2 text-black px-4 py-2 rounded-md'>
                                                                <FaCheckSquare />
                                                            </button>
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
            }

            <ToastContainer />
        </div>
    );
};

export default MyProducts;