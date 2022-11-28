import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckOutForm = ({ booking }) => {
    const { price } = booking;
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transationId, setTransationId] = useState('');
    const [success, setSuccess] = useState('');
    const stripe = useStripe();
    const elements = useElements()

    useEffect(() => {
        fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => {
                setClientSecret(data.clientSecret)
            })
    }, [price])



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: card
        })

        if (error) {
            setCardError(error.message)
        }
        else {
            setCardError('')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: booking.username,
                    email: booking.email
                }
            }
        })

        if (confirmError) {
            setCardError(confirmError)
            return
        }

        if (paymentIntent.status === 'succeeded') {
            setSuccess('payment successful')
            setTransationId(paymentIntent.id)
        }

        console.log("paymentIntent:", paymentIntent)

        // store payment info to db
        fetch(`http://localhost:5000/booking/${booking._id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    isPaid: true,
                    paymentId: paymentIntent.id,
                    paymentBy: booking.username,
                    amount: paymentIntent.amount / 100,
                    currency: paymentIntent.currency,
                    paymementMethod: paymentIntent.payment_method_types[0],
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-primary btn-sm mt-5 ml-auto w-full' type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>

            <p className='text-error text-sm'>
                {cardError}
            </p>

            <p className='text-green-500 text-sm'>
                {success}
            </p>
            <p>
                Your transationId : {transationId}
            </p>
        </>
    );
};

export default CheckOutForm;