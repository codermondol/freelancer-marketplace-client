import React from 'react';
import NavBar from '../components/NavBar';
import Home from '../pages/home/home';
import { Outlet } from 'react-router';

const root = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
        </div>
    );
};

export default root;