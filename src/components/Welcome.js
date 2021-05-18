import React from 'react';
import { withRouter } from 'react-router-dom';

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
    }
}


export default withRouter(Welcome);