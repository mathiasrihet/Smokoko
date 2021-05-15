import React from 'react';
import gameBackground from '../assets/gameBackground.png';
import Faim_logo from '../assets/Faim_logo.png';
import Energie_logo from '../assets/Energie_logo.png';
import Pet from './Pet';
import MyButton from './MyButton'
import Gauge from './Gauge'
import  './styles/House.css';


export default class House extends React.Component {
    constructor(props){
        super(props);
        let d = new Date();
        this.state = {
            smoke: 50,
            petIsAlive: true,
            hungerLevel : 40,
            sleepLevel : 100,
            playLevel : 100,
            smokingScore: 1,
            timeToBed : null,
            decreaseRateEnergy : 25,
            decreaseRateHunger : 25,
            decreaseRatePlay : 25,
            decreaseRateSmoke : 25,
            lastUpdateTime : d.getTime(),
            speed : 1,
        };
    }


    getScore(){
        /*return a score between 0 and 1 reflecting user performance*/
        return 1
    }

    msToHours(ms){
        return ms / (3600 * 1000)
    }

    updateLevels(){
        let d = new Date();
        let time = d.getTime();
        
        const timeSinceUpdate = this.msToHours(time - this.state.lastUpdateTime);
        //Convert it depending on units of decrease selected
        
        this.setState({lastUpdateTime : time,});
        
        this.updateHunger(timeSinceUpdate);
        this.updateSleep(timeSinceUpdate);
        this.updatePlay(timeSinceUpdate);
    }

    updateHunger(timeSinceUpdate){
        /*
        Make hungerLevel decrease depending on smoking quantity
        timeSinceUpdate is expressed in hours
        */
        this.setState({hungerLevel : Math.max(this.state.hungerLevel (- this.state.decreaseRateHunger * this.state.speed) * timeSinceUpdate, 0)});
    }

    updateSleep(timeSinceUpdate){
        /*
        make the sleepLevel decrease
        */
        this.setState({sleepLevel : Math.max(this.state.sleepLevel - this.state.decreaseRateEnergy * timeSinceUpdate, 0)});
    }

    updatePlay(timeSinceUpdate){
        /*
        Make the PlayLevel decrease
        */
        this.setState({playLevel : Math.max(this.state.playLevel - this.state.decreaseRatePlay * timeSinceUpdate, 0)});
    }

    updateSmoke(timeSinceUpdate){
        /*
        make the smoke decrease by evaporation and increase depending on smoking quantity
        */
        this.setState({smoke : Math.max(this.state.smoke - this.state.decreaseRateSmoke * timeSinceUpdate, 0)})
    }

    onClickSleep = () => {
        /*
        alpha : a parameter that defines how much the sleep is good depending on smoke quantity
        */
        let alpha = (100 - this.state.smoke) / 100
        this.setState({sleepLevel : this.state.sleepLevel + alpha * (100 - this.this.state.sleepLevel))});
    }

    onClickFeed = () => {
        /*Make the hunger level increase*/
        this.setState({hungerLevel : Math.min(this.state.hungerLevel + 10, 100)});
    }

    onClickPlay = () => {
        /*Make the play level increase and the energy level decrease*/
        if (Math.random() < this.getScore()){
            this.setState({playLevel : Math.min(this.state.playLevel + 10, 100)});
            this.setState({sleepLevel : Math.max(this.state.sleepLevel - 10, 0)});
        }else {
            /*Send a message and make the pet unusable for some time*/
        }
        
    }

    

    render(){
       
        return(
            <div className="wrapper">
               {/*  <style jsx>
                {`

                .wrapper{
                    background-color: #F3F3F3;
                     text-align: center;
                }
                .pet-area {
                    position: relative;
                    
                    top: 33%;
                    left: 0%;
                }
                .pet-area-img {
                    height: 40vw;
                    width: 60vw;
                    z-index: 0;
                }
                .button-container {
                   height: 0vw;
                    width: 100vw;
                    
                }
                .button {
                display: inline-grid;
                font-size: 2vw;
                background-color: white;
                height: 40vw;
                width: 20vw;
                

                    
                }

               
                `}
                </style> */}
               
                    <div>
                        <div className="pet-area">   
                            <Pet />
                            <img className="pet-area-img"  src={gameBackground}/>
                        </div>
                    </div>
                    
                    <div className="button-container">
                        <div className="button">
                            <Gauge value={this.state.playLevel} label={'Plaisir'} colorRange={["#ffe6f9", "#b30086"]}/>
                            <MyButton type='jouer' handleThis={this.onClickPlay}/>
                        </div>
                        <div className="button">
                            <Gauge value={this.state.hungerLevel} label={'Faim'} logo = {Faim_logo} colorRange={["#fffedc", "#ff9200"]}/>
                            <MyButton type='manger' handleThis={this.onClickFeed}/>
                        </div>
                        <div className="button">
                            <Gauge value={this.state.sleepLevel} label = {'Energie'} logo = {Energie_logo} colorRange={["#dbdbe7", "#4834d4"]}/>
                            <MyButton type='dormir' handleThis={this.onClickSleep}/>
                        </div> 
                    </div> 
                
            </div>
        )
    }
}
