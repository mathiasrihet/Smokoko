import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
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
    }
  
    render(){
      return (
      <Router>
        <div>
          <Banner />
        </div>
        <div>
          <nav>
            <ul>
            <h1>Les liens sont temporaires</h1>
              <li>
                <Link to="/">Welcome</Link>
              </li>
              {/* <li>
                <Link to="/about">About</Link>
              </li> */}
              <li>
                <Link to="/my-pet">My-pet</Link>
              </li>
            </ul>
          </nav>

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



// function App(){
//   return (
//     <div>
      
//       <div>
//         <Banner />
//         </div>
//       <div>
//         <House />
//         </div>
//       <div>
//         <Footer/>
//         </div>  
//     </div>
//   );
// }



// export default App;

