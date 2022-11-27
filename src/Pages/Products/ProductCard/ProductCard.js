import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css'

const ProductCard = ({ product }) => {
    // console.log(product);
    const { _id, img, name, price, category, seller, location, today } = product;
    return (
        <div className='card bg-gray-800 shadow relative productCard'>
            <span className='bg-gray-800 p-2 absolute top-2 right-2 text-xs'>
                {category}
            </span>
            <img src={img} alt="" className='productImg' />
            <div className='card-body'>
                <h3 className='card-title text-xl font-bold text-center'>
                    {name}
                </h3>
                <p>
                    <span className='font-bold'>Price: </span>
                    <span className='text-primary'>${price}</span>
                </p>

                <div className='divider text-xs'>seller info</div>
                <p>
                    <span className='font-bold'>Seller: </span>
                    <span className='text-primary'>{seller}</span>
                </p>
                <p>
                    <span className='font-bold'>Location: </span>
                    <span className='text-primary'>{location}</span>
                </p>
                <div className='divider text-xs'>listing time</div>
                <p>
                    <span className='font-bold'>Posted: </span>
                    <span className='text-primary'>{today}</span>
                </p>

                <Link to={`/product-details/${_id}`} className="btn btn-primary w-full mt-4">
                    Details
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;