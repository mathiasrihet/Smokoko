import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Banner from './components/Banner.js';
import Footer from './components/Footer.js';
import House from './components/House.js';
import Welcome from './components/Welcome.js';



export default class App extends React.Component {

    constructor(props){

      super(props);

      this.state = {
        user: ""
      }

    }


  
    handleLogin = (e)=>{
      this.setState({user:e});
    };

    handleLogout = ()=>{
      this.setState({user:""});
    };
    

    render(){
      return (
      <Router>
        <div>
          <Banner />
        </div>
        <div>
          <Switch>
            <Route path="/my-pet">
              <House onLogout={this.handleLogout}/>
            </Route>
            <Route path="/">
              <h1>{"Salut "+this.state.user}</h1>
              <Welcome handleSubmit={this.handleLogin}/>
            </Route>
          </Switch>
        </div>
        
        <div className="container-footer">
          <Footer/>
        </div> 
      </Router>
    );
  }
}


