// import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import CategoryCard from './CategoryCard/CategoryCard';
import './Categories.css';

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

            {
                isLoading ?
                    <div className='flex justify-center items-center w-full my-6'>
                        <progress className="progress w-56 mx-auto"></progress>
                    </div>

                    :
                    <div className='grid grid-cols-3 gap-6 mt-5'>

                        {
                            categories.map(category => <CategoryCard key={category._id} category={category}></CategoryCard>)
                        }
                    </div>
            }



        </div>
    );
};

export default Categories;


// img links

// dslr https://i.ibb.co/swyDZ5T/dslr1.jpg
// mirrorless https://i.ibb.co/T87wtB7/mirrorless2.jpg
// film https://i.ibb.co/2yrW6bZ/film1.jpg
// action https://i.ibb.co/JBg7G4L/action1.jpg
// 360 https://i.ibb.co/Z20B93d/3602.jpg
// instant https://i.ibb.co/421v1nz/instax1.jpg