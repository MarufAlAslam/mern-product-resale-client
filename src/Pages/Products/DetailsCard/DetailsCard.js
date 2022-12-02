import React from 'react';

const DetailsCard = (data) => {
    const { name } = data.data
    return (
        <div className='lg:w-1/2 w-full mx-auto py-10'>
            <div className='lg:flex justify-between'>
                <div className='lg:w-1/2'>
                    <h2 className='text-2xl font-bold'>Name: {name}</h2>
                    <h4 className='text-xl'>
                        Price : ${data.data.price}
                    </h4>

                    <p className='text-lg mt-2'>
                        Description: {data.data.description}
                    </p>
                    <p className='mt-2'>
                        Category: {data.data.category}
                    </p>
                    <p className='mt-2'>
                        Seller: {data.data.seller}
                    </p>
                    <p className='mt-2'>
                        Status: {data.data.status}
                    </p>
                    <p className='mt-2'>
                        Location: {data.data.location}
                    </p>
                    <p className='mt-2'>
                        Mobile: {data.data.mobile}
                    </p>
                    <p className='mt-2'>
                        Year of Purchase : {data.data.yearofpurchase}
                    </p>
                    <p className='mt-2'>
                        Posted On: {data.data.today}
                    </p>
                    <p className='mt-2'>
                        Original Price: {data.data.originalprice}
                    </p>
                    <p className='mt-2'>
                        Resale Price: {data.data.price}
                    </p>
                </div>
                <div className='lg:w-1/2'>
                    <img src={data.data.img} alt={data.data.name} />
                </div>
            </div>
        </div>
    );
};

export default DetailsCard;