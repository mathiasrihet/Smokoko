import React from "react";
import headPicture from '../assets/bannerPicture.png';
import  './styles/Banner.css';

export default function Banner() {
    return  (
        <div className="banner">
            <img className="banner-img" src={headPicture} alt="Banner"/>
        </div>
    )
}