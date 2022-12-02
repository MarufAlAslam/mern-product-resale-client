import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';

const Reported = () => {
    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => fetch('https://e-trade-server-phi.vercel.app/products')
            .then(res => res.json())
    })

    const removeReport = (id) => {
        fetch(`https://e-trade-server-phi.vercel.app/products/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ reported: false })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    refetch()
                    toast.success('Product Removed From Reported Successfully')
                }
            })
    }

    const deleteProduct = (id) => {
        fetch(`https://e-trade-server-phi.vercel.app/products/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    refetch()
                    toast.success('Product Deleted Successfully')
                }
            })
    }

    return (
        <div>
            <h2 className='text-center font-bold text-2xl'>
                Reported Items
            </h2>

            {
                isLoading ?
                    "Loading...."
                    :
                    (
                        products.length > 0 ?
                            (
                                <div className='lg:overflow-x-hidden overflow-x-auto'>
                                    <table className='table w-full text-center mt-10'>
                                        <thead>
                                            <tr>
                                                <th>Product Name</th>
                                                <th>Product Price</th>
                                                <th>Product Category</th>
                                                <th>Reported By</th>
                                                <th>Remove Report</th>
                                                <th>Delete This Product</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                // filter products and show only isReported true products
                                                products.filter(product => product.reported === true).map(product => (
                                                    <tr key={product._id}>
                                                        <td>{product.name}</td>
                                                        <td>{product.price}</td>
                                                        <td>{product.category}</td>
                                                        <td>{product.reportedBy}</td>
                                                        <td>
                                                            <button className='btn btn-primary btn-sm py-2 rounded-md text-black' onClick={() => removeReport(product._id)}>Remove Report</button>
                                                        </td>
                                                        <td>
                                                            <button className='btn btn-primary btn-sm py-2 rounded-md text-black' onClick={() => deleteProduct(product._id)}>Delete Product</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            )
                            :
                            (
                                <h2 className='text-center text-2xl font-bold'>
                                    No Reported Items
                                </h2>
                            )
                    )
            }

            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Reported;