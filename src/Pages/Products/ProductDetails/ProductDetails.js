import React from 'react';
import { useLoaderData } from 'react-router-dom';
import DetailsCard from '../DetailsCard/DetailsCard';

const ProductDetails = () => {
    const data = useLoaderData()

    console.log(data)

    return (
        <div className='lg:w--5/6 w-full mx-auto py-10'>
            <h2 className='text-2xl font-bold text-center'>Product Details</h2>

            <DetailsCard data={data}></DetailsCard>
        </div>
    );
};

export default ProductDetails;