import { useQuery } from '@tanstack/react-query';
import React from 'react';
import ProductCard from './ProductCard/ProductCard';

const Products = () => {
    // react query to fetch products

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => fetch('http://localhost:5000/products')
            .then(res => res.json())
    })


    return (
        <div className='mx-auto lg:w-5/6 w-full py-10'>
            <h3 className='text-3xl font-bold text-center'>
                All Products
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
                        <div className='product-grid grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-8'>
                            {
                                products.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                            }
                        </div>
                    )
            }
        </div>
    );
};

export default Products;