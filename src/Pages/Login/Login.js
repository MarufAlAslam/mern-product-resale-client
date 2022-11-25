import React from 'react';
import login from './login.svg'
import './Login.css'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
// import { FaGoogle } from 'react-icons/fa'

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
    };
    return (
        <div className='py-10 lg:w-5/6 w-full mx-auto'>
            <div className='grid gap-6 lg:grid-cols-2 grid-cols-1'>
                <div className='text-center my-auto'>
                    <img src={login} className="loginImg" alt="" />
                </div>
                <div className='text-center my-auto'>
                    <div className='card bg-gray-800 w-full'>
                        <div className='card-body'>
                            <h4 className='text-xl font-bold'>Login Now</h4>

                            <div className='divider'></div>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="Enter Email" className="input input-bordered input-primary w-full" />

                                {errors.email && <p className='text-error my-3 text-left'>Email is required</p>}

                                <input type="password" {...register("password", { required: true })} name="password" placeholder="Enter Password" className="input input-bordered input-primary w-full mt-4" />

                                {errors.password && <p className='text-error my-3 text-left'>Password is required</p>}


                                <input className='btn btn-primary w-full mt-4' type="submit" />


                                <p className='mt-4'>
                                    No Account Yet? <Link to='/register' className='text-primary'>Register Now</Link>
                                </p>

                                <div className='divider'>or</div>

                                <button className='btn btn-primary'>
                                    Login With Google
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;