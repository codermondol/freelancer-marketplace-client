import React from 'react';
import NavBar from '../components/NavBar';
import Home from '../pages/home/home';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const root = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default root;