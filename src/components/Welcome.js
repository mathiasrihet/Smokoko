import React from 'react';
import { withRouter } from 'react-router-dom';
import  './styles/Welcome.css';

class Welcome extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          value: '',
        };

        this.handleChange = this.handleChange.bind(this);
      }
    
    handleChange = (event)=>{
        this.setState({value: event.target.value});
        event.preventDefault();
      }

    handleSubmit = (event)=>{
        this.props.handleSubmit(this.state.value)
        this.props.history.push("/my-pet");
        event.preventDefault();
      }

    render(){
        return (
        <div className="page-acceuil">
           
            <h1> Bienvenue </h1>
            <form  className="form" onSubmit={this.handleSubmit}>
                <p></p>
                    
                <label className="label"> Pseudo  </label>    
                 <input className="input1" type="text" value={this.state.value} onChange={this.handleChange}/>
                 
                <input className="input2" type="submit" value="Log in" />
                  
          <div className="vide">
            <p></p>
            
          </div>
        </form>
        </div>
      );
    }
}


export default withRouter(Welcome);