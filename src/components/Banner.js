import React from "react";
import headPicture from '../assets/bannerPicture.png';
import  './styles/Banner.css';

function Banner() {
    return  <div className="banner">
        {/* {<style jsx>
               { {`

                .banner {
                    
                background-color: white;
                   width: 100vw;
                   height: 10vw;
                   text-align:center;

                }
                .banner-img {
                    
                    height: 10vw;
                    width: 20vw;
                    z-index: 0;
                    
                }
                `} }
                </style>} */}
                <img className="banner-img" src={headPicture}/>
            </div>
}

export default Banner