import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.css'

const CategoryCard = ({ category }) => {
    const { _id, title, img } = category;
    return (
        <Link to={`/category/${_id}`}>
            <div className='bg-blue-900 card rounded-none text-center' data-aos="fade-up">
                <div className='card-body flex flex-row items-center p-0'>
                    <img src={img} className="categoryImg" alt="" />
                    <h3 className='text-lg'>{title}</h3>
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;