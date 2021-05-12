import React from "react";

export default function MyButton (props) {
    return (
        <div className="Button-area">
            <button className={props.type} onClick={props.handleThis}>{props.type}</button>
        </div>
    )
}