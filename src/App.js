import React from 'react';
import House from './components/House.js';
import Banner from './components/Banner.js';
import Footer from './components/Footer.js';
import MyButton from './components/MyButton.js';


function App(){
  return (
    <div>
      
        <Banner />
        <House />
      
        <Footer/>
        <MyButton/> 
    </div>
  );
}



export default App;

