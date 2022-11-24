import React from 'react';
import broken from './broken.svg'
import './Broken.css';
import { Link } from 'react-router-dom';

const Broken = () => {
    return (
        <div className='text-center py-14'>
            <img src={broken} className="brokenImg" alt="" />
            <h3 className='font-bold text-4xl'>
                Oh No! You Are Lost 🥺🥺
            </h3>
            <p className='mt-2'>
                The page you are looking for is broken or does not exist. <Link to='/'>Please go back to the home page</Link>.
            </p>
        </div>
    );
};

export default Broken;