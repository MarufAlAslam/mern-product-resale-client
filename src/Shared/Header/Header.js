import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../Utils/Contexts/AuthProvider';
import logo from './logo.png'

const Header = () => {
    const { user, logout } = useContext(AuthContext)
    const handleLogout = () => {
        logout()
            .then(() => {
                toast.success('logged out')
            }
            )
    }
    return (
        <div>
            <div className="navbar bg-gray-700">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <NavLink to='/'>
                                    Home
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <Link to='/'>
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        <li>
                            <NavLink to='/'>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/products'>
                                Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/blogs'>
                                Blogs
                            </NavLink>
                        </li>

                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user?.uid ?
                            <>
                                <ul className='menu menu-horizontal p-0'>
                                    <li>
                                        <NavLink to='/dashboard'>
                                            Dashboard
                                        </NavLink>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout} className='btn btn-error text-black ml-2'>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </>

                            :

                            <>
                                <ul className='menu menu-horizontal p-0'>
                                    <li>
                                        <NavLink to='/login'>
                                            Login
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/register'>
                                            Register
                                        </NavLink>
                                    </li>
                                </ul>
                            </>

                    }


                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Header;