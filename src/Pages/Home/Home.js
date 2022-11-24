import React, { useEffect } from 'react';
import Banner from './Banner/Banner';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Categories from './Categories/Categories';

const Home = () => {

    useEffect(() => {
        AOS.init()
        document.title = 'Home | Furniture';
    }, []);

    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
        </div>
    );
};

export default Home;