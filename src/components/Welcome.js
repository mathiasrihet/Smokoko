import React from 'react';

export default class Welcome extends React.Component{
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
      }
    
    handleChange = (event)=>{
        this.setState({value: event.target.value});
        event.preventDefault();
      }

    handleSubmit = (event)=>{
        this.props.handleSubmit(this.state.value)
        event.preventDefault();
      }
    
    render(){
        return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Pseudo :
            <input type="text" value={this.state.value} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Log in" />
        </form>
      );
        // return(
        // <div>
        //     <div>{"Welcome " + this.state.my_name}</div>
        //     <form onSubmit={this.on_submit_form}>
        //         <input placeholder="enter your name" type="text" ref={this.answer_ref} />
        //         <input type="submit" value="log in" />
        //     </form>
        // </div>
        // ) 
        }
}