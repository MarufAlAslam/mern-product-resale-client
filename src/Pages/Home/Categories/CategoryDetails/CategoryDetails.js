import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CategoriedCard from '../../../Products/CategoriedCard/CategoriedCard';

const CategoryDetails = () => {
    const category = useLoaderData()
    const { title } = category;
    console.log(title)


    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => fetch('http://localhost:5000/products/')
            .then(res => res.json())
    })
    return (
        <div className='py-10 lg:w-5/6 w-full mx-auto'>
            <p className='text-center'>
                Selected Category
            </p>
            <h3 className='text-2xl font-bold text-center'>
                {title}
            </h3>

            <div className='mt-10 grid grid-cols-1 gap-6'>
                {
                    isLoading ?
                        (
                            <div className='flex justify-center items-center w-full my-6'>
                                <progress className="progress w-56 mx-auto"></progress>
                            </div>
                        )
                        :
                        (
                            // eslint-disable-next-line array-callback-return
                            products.map(product => {
                                // filter by category title
                                if (product.category === title) {
                                    return <CategoriedCard key={product._id} product={product}></CategoriedCard>
                                }
                            })
                        )
                }
            </div>
        </div>
    );
};

export default CategoryDetails;