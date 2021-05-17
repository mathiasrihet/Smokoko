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



export default function App() {
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
            <Welcome />
          </Route>
        </Switch>
      </div>
      <div>
        <Footer/>
      </div> 
    </Router>
  );
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

