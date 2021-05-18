import React from 'react';
<<<<<<< HEAD
import  './styles/Welcome.css';
=======
import { withRouter } from 'react-router-dom';
>>>>>>> 318aff91374dbd9ef51740e250de04fb04302433

class Welcome extends React.Component{
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
        this.props.history.push("/my-pet")
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


export default withRouter(Welcome);