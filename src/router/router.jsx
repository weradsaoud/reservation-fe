import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Pathes from './pathes';
import Login from '../components/login/login';
import Layout from '../components/layouts/layout';
import Err from '../components/error/error';
import Signup from '../components/signup/signup';
import Home from '../components/home/home';
import { isAuthenticated } from '../services/authService';
import Reserve from '../components/reserve/reserve';

function Router() {

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) navigate(Pathes.logInPath);
    }, [])

    return (
        <Routes>
            <Route path={Pathes.logInPath} element={<Layout />}>
                <Route index element={<Login />} />
                <Route path={Pathes.signupPath} element={<Signup />} />
                <Route path={Pathes.homePath} element={<Home />} />
                <Route path={Pathes.reservePath} element={<Reserve />} />
                <Route path='/err' element={<Err />} />
            </Route>
        </Routes>
    );
}

export default Router;