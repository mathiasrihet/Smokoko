import React from "react";

export default class MyButton extends React.Component {
    constructor(props) {
        super(props);//cannot use "this" keyword until "super(props);" has been placed

        //initialization of the attributes of the application state
        this.state = {
            type: this.props.type,
        };
    }

    on_click = () => {
        this.props.handleThis(this.state.type);//execute the callback method transmitted via the props of the class by the parent component
    };

    get_button_classname = () => {
        return this.state.type;//get class name according to state value
    }



    render(){
        return (
            <div className="Button-area">
                <button className={this.get_button_classname()} onClick={() => this.on_click()}>{this.state.type}</button>
            </div>
        )
    }




}