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
import  './App.css';


export default class App extends React.Component {

<<<<<<< HEAD
export default function App() {
  return (
    <div className="Global">
    <Router>
       <div>
        
         <Banner />
       
       </div>
      <div>
        {/* <nav>
          <ul>
          <h1>Les liens sont temporaires</h1>
            <li>
              <Link to="/">Welcome</Link>
            </li>
            { <li>
              <Link to="/about">About</Link>
            </li> }
            <li>
              <Link to="/my-pet">My-pet</Link>
            </li>
          </ul>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          {/* <Route path="/about">
            <About />
          </Route> */}
          <Route path="/my-pet">
            <House />
          </Route>
          <Route path="/">
            <Welcome />
          </Route>
        </Switch>
      </div>
      
      <div className="container-footer">
        <Footer/>
      </div> 
    </Router>
    </div>
  );
}
=======
    constructor(props){

      super(props);

      this.state = {
        user: ""
      }
>>>>>>> 318aff91374dbd9ef51740e250de04fb04302433

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


