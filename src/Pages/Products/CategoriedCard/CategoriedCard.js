// import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../../Utils/Contexts/AuthProvider';


const CategoriedCard = ({ product, handleModal, setModalVisibility }) => {
    const currentYear = new Date().getFullYear()
    const { user } = useContext(AuthContext)
    const { _id, img, name, description, condition, location, originalprice, price, yearofpurchase, today, seller, selleremail, status } = product;
    const [verified, setVerified] = useState(false)




    useEffect(() => {
        fetch(`https://e-trade-server-phi.vercel.app/user?email=${selleremail}`)
            .then(res => res.json())
            .then(data => {
                setVerified(data.isVerified);
                // setModalVisibility(true)
            }
            )
    }, [selleremail])





    // console.log(modalData)


    const reportTAdmin = (id) => {
        // add reported: true to product
        fetch(`https://e-trade-server-phi.vercel.app/report/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    reported: true,
                    reportedBy: user.email
                }
            )
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    toast.success('Reported to admin')
                }
            })
    }




    return (
        <div className='card bg-gray-800 categoriedCard'>
            <div className='card-body flex flex-row justify-center'>
                <img src={img} className="w-2/5 object-cover" alt="" />
                <div className='w-3/5 p-8'>
                    <div className='text-right'>
                        <button className='btn btn-sm btn-error' onClick={() => reportTAdmin(_id)}>
                            Report
                        </button>
                    </div>
                    <p>
                        {
                            status === 'available' ? (
                                <span className='text-green-500'>
                                    {status}
                                </span>
                            ) : (
                                <span className='text-red-500'>
                                    {status}
                                </span>
                            )
                        }
                    </p>
                    <h3 className='text-xl font-bold mb-3'>{name}</h3>
                    <p>
                        {description}
                    </p>
                    <p className='mt-3'>
                        <span>Condition: </span>
                        <span className='text-primary'>{condition}</span>
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

                    {
                        user?.email === selleremail ? (
                            <h3 className='text-primary'>Hey! You Are The Seller of this product</h3>
                        ) : (

                            status === 'available' ? (
                                <button className='btn btn-primary w-full mt-4' onClick={() => handleModal(_id)}>
                                    Book Now
                                </button>
                            ) : (
                                <h3 className='text-red-500 text-center mt-6'>This Product is Sold</h3>
                            )

                        )
                    }

                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div >
    );
};

export default CategoriedCard;