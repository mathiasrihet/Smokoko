import React from 'react';
import  './styles/Welcome.css';

export default class Welcome extends React.Component{
    constructor(props) {
        super(props);//cannot use "this" keyword until "super(props);" has been placed

        //initialization of the attributes of the application state
        this.state = {
            my__name: ""
        };

        this.answer_ref = React.createRef();//allows to create a reference to a DOM element

    }

    on_submit_form = (e) => {
        e.preventDefault();//avoid reloading the page
        this.setState({ my_name: this.answer_ref.current.value });//update of the state by taking the value of a referenced input
    }

    render(){
        return(
        <div>
        <div>{"Welcome " + this.state.my_name}</div>
        <form onSubmit={this.on_submit_form}>
            <input placeholder="enter your name" type="text" ref={this.answer_ref} />
            <input type="submit" value="log in" />
        </form>
        </div>
        ) 
    }
}