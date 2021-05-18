import React from "react";
import  './styles/Footer.css';

function Footer() {
    return  <footer className="footer-basic">
        <div>
        <div class="social"><a href="#"><i class="icon ion-social-instagram"></i></a><a href="#"><i class="icon ion-social-snapchat"></i></a><a href="#"><i class="icon ion-social-twitter"></i></a><a href="#"><i class="icon ion-social-facebook"></i></a></div>
        <ul class="list-inline">
               
                <li class="list-inline-item"><a>Services</a></li>
                <li class="list-inline-item"><a >About</a></li>
                <li class="list-inline-item"><a>Terms</a></li>
                <li class="list-inline-item"><a>Privacy Policy</a></li>
            </ul>
            <p></p>
            <p class="copyright">Smokoko © 2021</p>
        </div>  
            </footer>
}

export default Footer