import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Utils/Contexts/AuthProvider';
import './ProductCard.css'

const ProductCard = ({ product }) => {
    const { user } = useContext(AuthContext)
    // console.log(product);
    const { _id, img, name, price, category, seller, location, today, selleremail, status } = product;
    // console.log(selleremail)
    return (
        <div className='card bg-gray-800 shadow relative productCard'>
            <span className='bg-gray-800 p-2 absolute top-2 right-2 text-xs'>
                {category}
            </span>
            <img src={img} alt="" className='productImg' />
            <div className='card-body'>
                <p className='text-sm'>
                    {status === 'available' ? (
                        <span className='text-green-500'>
                            {status}
                        </span>
                    ) :
                        (
                            <span className='text-red-500'>
                                {status}
                            </span>
                        )
                    }
                </p>
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

                {
                    user ? (
                        user?.email === selleremail ? (
                            <h3 className='text-primary'>Hey! You Are The Seller of this product</h3>
                        ) : (

                            status === 'available' ? (
                                <Link to={`/product-details/${_id}`} className="btn btn-primary w-full mt-4">
                                    Details
                                </Link>
                            ) : (
                                <h3 className='text-red-500 text-center'>This Product is Sold</h3>
                            )

                        )
                    ) :
                        (
                            status === 'available' ? (
                                <Link to={`/product-details/${_id}`} className="btn btn-primary w-full mt-4">
                                    Details
                                </Link>
                            ) : (
                                <h3 className='text-red-500 text-center'>This Product is Sold</h3>
                            )
                        )
                }


            </div>
        </div>
    );
};

export default ProductCard;