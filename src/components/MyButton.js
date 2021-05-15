import { area } from "d3-shape";
import React from "react";

export default function MyButton (props) {
    return (
        <div>
        <style jsx> {`

            .Button-area{
                background-color:white;
                
            }
            `}
        </style>
        <div className="Button-area">
            <button className="My-button" onClick={props.handleThis}>{props.type}</button>
        </div>
        </div>
    )
}