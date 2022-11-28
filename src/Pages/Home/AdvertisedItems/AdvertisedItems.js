import { useQuery } from '@tanstack/react-query';
import React from 'react';
import ProductCard from '../../Products/ProductCard/ProductCard';

const AdvertisedItems = () => {

    const { data: advertisedProducts = [], isLoading } = useQuery({
        queryKey: ['advertisedProducts'],
        queryFn: () => fetch('https://e-trade-server-phi.vercel.app/advertisedProducts')
            .then(res => res.json())
    })
    return (
        <div className='py-10 lg:w-5/6 w-full mx-auto'>
            <h3 className='text-2xl font-bold text-center'>
                Advertised Items
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
                                advertisedProducts.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                            }
                        </div>
                    )
            }
        </div>
    );
};

export default AdvertisedItems;