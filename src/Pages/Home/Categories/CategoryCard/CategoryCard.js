import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
    const { title } = category;
    return (
        <Link>
            <div className='bg-blue-900 card rounded-none text-center'>
                <div className='card-body'>
                    <h3 className='text-lg'>{title}</h3>
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;