import React from "react";
import  './styles/Footer.css';

export default function Footer() {
    return  (
        <footer className="footer-basic">
            <div>
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
    )
}