// import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import CategoryCard from './CategoryCard/CategoryCard';

const Categories = () => {

    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetch('http://localhost:5000/categories/')
            .then(res => res.json())
    });
    return (
        <div className='py-10 lg:w-5/6 w-full mx-auto'>
            <h3 className='text-2xl font-bold text-center'>
                Available Categories
            </h3>

            <div className='grid grid-cols-3 gap-6 mt-5'>

                {
                    isLoading ? 'Loading...' : categories.map(category => <CategoryCard key={category._id} category={category}></CategoryCard>)
                }
            </div>
        </div>
    );
};

export default Categories;