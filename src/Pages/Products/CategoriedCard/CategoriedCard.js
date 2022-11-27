// import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa'
// import { AuthContext } from '../../../Utils/Contexts/AuthProvider';

const CategoriedCard = ({ product }) => {
    const currentYear = new Date().getFullYear()
    // const { user } = useContext(AuthContext)
    const { img, name, description, location, originalprice, price, yearofpurchase, today, seller, selleremail } = product;
    const [verified, setVerified] = useState(false)


    useEffect(() => {
        fetch(`http://localhost:5000/user?email=${selleremail}`)
            .then(res => res.json())
            .then(data => {
                setVerified(data.isVerified);
            }
            )
    }, [selleremail])



    return (
        <div className='card bg-gray-800 categoriedCard'>
            <div className='card-body flex flex-row justify-center'>
                <img src={img} className="w-2/5 object-cover" alt="" />
                <div className='w-3/5 p-8'>
                    <h3 className='text-xl font-bold mb-3'>{name}</h3>
                    <p>
                        {description}
                    </p>
                    <div className='divider'></div>
                    <p>
                        <span>Location:</span> <span className='text-primary'>{location}</span>
                    </p>
                    <p>
                        <span>Original Price: </span>
                        <strike className='text-primary'>${originalprice}</strike>
                    </p>
                    <p>
                        <span>Re-Sell Price: </span>
                        <span className='text-primary'>${price}</span>
                    </p>
                    <p>
                        <span>Bought On: </span>
                        <span className='text-primary'>{yearofpurchase}</span>
                    </p>
                    <p>
                        <span>Total Used: </span>
                        <span className='text-primary'>{parseInt(currentYear) - parseInt(yearofpurchase)} Years</span>
                    </p>
                    <p>
                        <span>Posted On: </span>
                        <span className='text-primary'>{today}</span>
                    </p>
                    <p className='flex flex-row items-center'>
                        <span className='inline-block mr-1'>Seller: </span>
                        <span className='text-primary'>{seller}</span> {
                            verified ? <span className='text-success'>
                                <FaCheckCircle className='ml-1' />
                            </span> : <span></span>
                        }
                    </p>

                    <div className='divider'></div>

                    <button className='btn btn-primary w-full mt-5'>
                        Book now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoriedCard;