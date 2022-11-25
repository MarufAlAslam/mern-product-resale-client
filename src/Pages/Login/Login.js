import React, { useContext, useState } from 'react';
import loginImg from './login.svg'
import './Login.css'
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Utils/Contexts/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { FaGoogle } from 'react-icons/fa'

const Login = () => {
    const { login, loginWithPopup } = useContext(AuthContext)
    const [error, setError] = useState('')
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const location = useLocation()
    const navigate = useNavigate()

    const from = location.state?.from?.pathname || '/login'
    const onSubmit = data => {
        // console.log(data);
        login(data.email, data.password)
            .then(res => {
                console.log(res);
                toast.success('Login Successfully')
                navigate(from, { replace: true })
                reset()
            }
            )
            .catch(err => {
                setError(err.message);
            }
            )
    };
    const handleGoogleLogin = () => {
        loginWithPopup()
            .then(res => {
                console.log(res);
                toast.success('Login Successfully')
                navigate(from, { replace: true })
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className='py-10 lg:w-5/6 w-full mx-auto'>
            <div className='grid gap-6 lg:grid-cols-2 grid-cols-1'>
                <div className='text-center my-auto'>
                    <img src={loginImg} className="loginImg" alt="" />
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


                                <input className='btn btn-primary w-full mt-4' value="Login" type="submit" />

                                <p>
                                    {
                                        error && <p className='text-error my-3 text-center'>{error}</p>
                                    }
                                </p>


                                <p className='mt-4'>
                                    No Account Yet? <Link to='/register' className='text-primary'>Register Now</Link>
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
        </div>
    );
};

export default Login;