// import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../Utils/Contexts/AuthProvider';

const BookingModal = ({ modalData, setModalVisibility }) => {


    const bookingHandler = (e) => {
        e.preventDefault();

        const form = e.target;
        const username = form.username.value;
        const email = form.email.value;
        const productname = form.productname.value;
        const productid = form.productid.value;
        const selleremail = form.selleremail.value;
        const price = form.price.value;
        const mobile = form.mobile.value;
        const location = form.location.value;
        const productimg = form.productimg.value;

        const bookingData = {
            username,
            email,
            productname,
            productid,
            productimg,
            price,
            selleremail,
            mobile,
            location,
            isPaid: false
        }

        // post booking data to server
        fetch('https://e-trade-server-phi.vercel.app/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    toast.success('Booking Successful');
                    setModalVisibility(false);
                }
            }
            )
    }

    const { user } = useContext(AuthContext)
    return (
        <div>
            <div className='customModal'>
                <div className='custom-modal-content'>
                    <div className='custom-modal-header flex justify-between items-center'>
                        <h3 className='text-xl font-bold'>{modalData.name}</h3>
                        <button className='btn bg-ghost' onClick={() => setModalVisibility(false)}>X</button>
                    </div>

                    <form onSubmit={bookingHandler}>
                        <div className='lg:flex justify-between'>
                            <div className='w-1/2 p-4'>
                                <div className='custom-modal-body my-3'>
                                    <div className='divider'>user info</div>
                                </div>

                                <div className='form-group'>
                                    <label className='block mb-2 text-sm'>
                                        User Name:
                                    </label>
                                    <input type="text" name='username' disabled className='input input-bordered input-primary w-full' defaultValue={user.email.split('@')[0]} />
                                </div>
                                <div className='form-group my-3'>
                                    <label className='block mb-2 text-sm'>
                                        User Email:
                                    </label>
                                    <input type="email" name='email' disabled className='input input-bordered input-primary w-full' defaultValue={user.email} />
                                </div>

                                <div className='custom-modal-body my-3'>
                                    <div className='divider'>Product info</div>
                                </div>

                                <input type="hidden" name='productimg' disabled className='input input-bordered input-primary w-full' defaultValue={modalData.img} />
                                <input type="hidden" name='productid' disabled className='input input-bordered input-primary w-full' defaultValue={modalData._id} />

                                <div className='form-group my-3'>
                                    <label className='block mb-2 text-sm'>
                                        Product Name:
                                    </label>
                                    <input type="text" name='productname' disabled className='input input-bordered input-primary w-full' defaultValue={modalData.name} />
                                </div>
                                <div className='form-group my-3'>
                                    <label className='block mb-2 text-sm'>
                                        Product Price:
                                    </label>
                                    <input type="text" name='price' disabled className='input input-bordered input-primary w-full' defaultValue={modalData.price} />
                                </div>
                                <div className='form-group my-3'>
                                    <label className='block mb-2 text-sm'>
                                        Seller Email:
                                    </label>
                                    <input type="text" name='selleremail' disabled className='input input-bordered input-primary w-full' defaultValue={modalData.selleremail} />
                                </div>
                            </div>
                            <div className='w-1/2 p-4'>
                                <div className='custom-modal-body my-3'>
                                    <div className='divider'>Buying info</div>
                                </div>

                                <div className='form-group'>
                                    <label className='block mb-2 text-sm'>
                                        Mobile Number:
                                    </label>
                                    <input type="text" name='mobile' required className='input input-bordered input-primary w-full' placeholder='Put your Mobile Number Here' />
                                </div>
                                <div className='form-group my-3'>
                                    <label className='block mb-2 text-sm'>
                                        Meeting Location:
                                    </label>
                                    <input type="text" name='location' required className='input input-bordered input-primary w-full' placeholder='Where do you want to meet?' />
                                </div>


                                <button className='btn btn-primary w-full mt-16'>
                                    Confirm Booking
                                </button>

                            </div>
                        </div>



                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default BookingModal;