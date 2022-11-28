import React, { useEffect } from 'react';
import Banner from './Banner/Banner';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Categories from './Categories/Categories';
import AdvertisedItems from './AdvertisedItems/AdvertisedItems';
import RecentlyAdded from './RecentlyAdded/RecentlyAdded';


const Home = () => {

    const [countAdvertisedItems, setCountAdvertisedItems] = React.useState(0);

    useEffect(() => {
        fetch('https://e-trade-server-phi.vercel.app/advertisedProducts')
            .then(res => res.json())
            .then(data => setCountAdvertisedItems(data.length))

    }, [countAdvertisedItems]);

    useEffect(() => {
        AOS.init()
    }, []);


    console.log(countAdvertisedItems)
    return (
        <div>
            <Banner></Banner>
            {
                countAdvertisedItems > 0 && <AdvertisedItems></AdvertisedItems>
            }
            <Categories></Categories>

            <RecentlyAdded></RecentlyAdded>
        </div>
    );
};

export default Home;