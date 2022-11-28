import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import CheckOutForm from './CheckOutForm/CheckOutForm';

const stripePromise = loadStripe('pk_test_51M99pJLwrQKEDFyBhDmSNBw4LdihrYXX4sM0CXG6FR3Xk2hDbBbivOLG8zn1J2lX3lzdUUo0IgGH89q4j5ZNO7AO00H8h8cpei')




const Payment = () => {
    const id = window.location.pathname.split('/')[3];

    const { data: booking = [], isLoading } = useQuery({
        queryKey: ['booking', id],
        queryFn: () => fetch(`http://localhost:5000/booking/${id}`)
            .then(res => res.json())
    })
    console.log(booking.price)
    return (
        <div className='lg:w-5/6 w-full mx-auto py-10'>
            <h2 className='text-center text-2xl font-bold'>
                Payment for: <span className='text-primary'>
                    {booking.productname}
                </span>
            </h2>
            <p className='text-center mt-3'>
                Please Pay <span className='text-primary'>${booking.price} </span> to the seller
            </p>

            <div className='md:w-96 w-full mx-auto my-6 card bg-gray-800'>
                <div className='card-body'>
                    <Elements stripe={stripePromise}>
                        <CheckOutForm booking={booking}></CheckOutForm>
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;