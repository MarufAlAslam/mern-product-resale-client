import React, { useContext, useState } from 'react';
import reg from './register.svg'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Utils/Contexts/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const { createUser, loginWithPopup } = useContext(AuthContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [error, setError] = useState('')
    const onSubmit = data => {
        // console.log(data);
        createUser(data.email, data.password)
            .then(res => {
                console.log(res);


                // post user infomation to mongo database
                fetch('http://localhost:5000/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: data.email,
                        role: data.role,
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                    })


                setError('')
                toast.success('User Created Successfully')
                reset()
            }
            )
            .catch(err => {
                setError(err.message)
            })
    };

    const handleGoogleLogin = () => {
        loginWithPopup()
            .then(res => {
                console.log(res);
                toast.success('Login Successfully')
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className='py-10 lg:w-5/6 w-full mx-auto'>
            <div className='grid gap-6 lg:grid-cols-2 grid-cols-1'>
                <div className='text-center my-auto'>
                    <img src={reg} className="loginImg" alt="" />
                </div>
                <div className='text-center my-auto'>
                    <div className='card bg-gray-800 w-full'>
                        <div className='card-body'>
                            <h4 className='text-xl font-bold'>Register Now</h4>

                            <div className='divider'></div>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="Enter Email" className="input input-bordered input-primary w-full" />

                                {errors.email && <p className='text-error my-3 text-left'>Email is required</p>}

                                <select name='role' {...register("role", { required: true })} className="input input-bordered input-primary w-full mt-4" >
                                    <option value="" disabled>
                                        Select an Option
                                    </option>
                                    <option value="user" key="2">Role : User</option>
                                    <option value="seller" key="3">Role : Seller</option>
                                </select>

                                {errors.role && <p className='text-error my-3 text-left'>Password is required</p>}

                                <input type="password" {...register("password", { required: true })} name="password" placeholder="Enter Password" className="input input-bordered input-primary w-full mt-4" />

                                {errors.password && <p className='text-error my-3 text-left'>Password is required</p>}


                                <input className='btn btn-primary w-full mt-4' value="register" type="submit" />

                                <p>
                                    {
                                        error && <p className='text-error my-3 text-center'>{error}</p>
                                    }
                                </p>

                                <p className='mt-4'>
                                    Already Have an Account? <Link to='/login' className='text-primary'>Login Now</Link>
                                </p>

                                <div className='divider'>or</div>


                            </form>
                            <button className='btn btn-primary' onClick={handleGoogleLogin}>
                                Login With Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div >
    );
};

export default Register;