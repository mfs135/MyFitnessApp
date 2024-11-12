import React from 'react';
import Navbar from '../components/Navbar.js';
import Banner from '../components/banner.js';
import Intro from '../components/intro.js';

function Home(){
    return (
        <div>
            <Navbar />
            <Banner />
            <Intro />
        </div>
    )
}

export default Home;