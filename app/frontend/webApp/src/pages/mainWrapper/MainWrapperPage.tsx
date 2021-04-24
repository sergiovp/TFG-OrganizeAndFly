import react, {useEffect, useState} from 'react';
import Footer from '../../components/footer/Footer';
import NavAuth from '../../components/navAuth/NavAuth';
import HomeAuthPage from '../homeAuth/HomeAuth';
import {  whoAmI } from '../../requests/userRequests'; 
import { useSelector, RootStateOrAny } from 'react-redux';


export default function MainWrapperPage() {

    return (
        <>
            <NavAuth />
            <HomeAuthPage />
            <Footer />
        </>
    );
}
