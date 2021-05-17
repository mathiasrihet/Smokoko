import { area } from "d3-shape";
import React from "react";
import  './styles/My-button.css';

export default function MyButton (props) {
    return (
        <div className="Button-area">
            <button className="My-button" onClick={props.handleThis}>{props.type}</button>
        </div>
    )
}