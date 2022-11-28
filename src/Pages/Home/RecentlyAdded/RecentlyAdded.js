import { useQuery } from '@tanstack/react-query';
import React from 'react';
import ProductCard from '../../Products/ProductCard/ProductCard';

const RecentlyAdded = () => {
    const { data: recents = [], isLoading } = useQuery({
        queryKey: ['recents'],
        queryFn: () => fetch('https://e-trade-server-phi.vercel.app/recents/')
            .then(res => res.json())
    })
    return (
        <div className='lg:w-5/6 w-full mx-auto py-10'>
            <h3 className='text-2xl font-bold text-center'>Recently Added Products</h3>

            {
                isLoading ?
                    (
                        <div className='flex justify-center items-center w-full my-6'>
                            <progress className="progress w-56 mx-auto"></progress>
                        </div>
                    )
                    :
                    (
                        <div className='grid grid-cols-3 gap-6 mt-5'>
                            {
                                recents.map(recent => <ProductCard key={recent._id} product={recent}></ProductCard>)
                            }
                        </div>
                    )
            }
        </div>
    );
};

export default RecentlyAdded;