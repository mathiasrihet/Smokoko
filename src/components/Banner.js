import React from "react";
import headPicture from '../assets/bannerPicture.png';

function Banner() {
    return  <div>
        <style jsx>
                {`
                
                .banner-img {
                    position : relative;
                    top: 0px; left: 250px; right: 550px;
                    height: 35%;
                    width: 35%;
                    z-index: 0;
                }
                .button-container {
                    display: flex;
                    margin: 10px;
                    padding: 10px;
                }
                .button {
                    margin: 10px;
                }
                `}
                </style>
                <img className="banner-img" src={headPicture}/>
            </div>
}

export default Banner