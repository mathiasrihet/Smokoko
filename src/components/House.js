import React from 'react';
import gameBackground from '../assets/gameBackground.png';
import smoke from '../assets/smoke3.png';
import Pet from './Pet';
import MyButton from './MyButton'
import Gauge from './Gauge'
import  './styles/House.css';
import API from './api'
import { withRouter } from 'react-router-dom';


class House extends React.Component {
    constructor(props){
        super(props);
        //Récupérer données depuis API pour les mettre dans le state
        let d = new Date();
        this.state = {
            smoke: 50,
            petIsAlive: true,
            hungerLevel : 40,
            sleepLevel : 100,
            playLevel : 100,
            smokingScore: 1,
            timeToBed : 0,
            decreaseRateEnergy : 25,
            decreaseRateHunger : 25,
            decreaseRatePlay : 25,
            decreaseRateSmoke : 25,
            lastUpdateTime : d.getTime(),
            speed : 360,
            feeling : "normal",
        };
    }


    getScore(){
        /*return a score between 0 and 1 reflecting user performance*/
        return 1;
    }

    msToHours(ms){
        return ms / (3600 * 1000);
    }

    hoursToMs(hrs){
        return hrs * (3600 * 1000);
    }

    getTime(){
        return new Date().getTime();
    }

    getLastPeufRecord(pseudo){
        API.get('/Peufs', {params : {pseu : pseudo}})
            .then(resp => {console.log(resp.data[resp.data.length - 1]);})
            // .then(resp => {
            //     this.setState({lastPeuf : resp.data[resp.data.length - 1],});
            // });
    }

    componentDidMount() {
        this.updateInterval = setInterval(() => this.updateLevels(), 1000);
    }

    updateLevels(){
        this.getLastPeufRecord(this.props.currentUser);

        let time = this.getTime();
        
        const timeSinceUpdate = this.msToHours(time - this.state.lastUpdateTime);
        //Convert it depending on units of decrease selected
        
        this.setState({lastUpdateTime : time,});
        
        this.updateHunger(timeSinceUpdate);
        if (this.getTime() > this.state.timeToBed){
            this.updateSleep(timeSinceUpdate);
            this.setState({feeling : "normal"})
        }
        this.updatePlay(timeSinceUpdate);

        //Update le feeling angry
    }

    updateHunger(timeSinceUpdate){
        /*
        Make hungerLevel decrease depending on smoking quantity
        timeSinceUpdate is expressed in hours
        */
        this.setState({hungerLevel : Math.max(this.state.hungerLevel - this.state.decreaseRateHunger * timeSinceUpdate * this.state.speed, 0)});
    }

    updateSleep(timeSinceUpdate){
        /*
        make the sleepLevel decrease
        */
        this.setState({sleepLevel : Math.max(this.state.sleepLevel - this.state.decreaseRateEnergy * timeSinceUpdate * this.state.speed, 0)});
    }

    updatePlay(timeSinceUpdate){
        /*
        Make the PlayLevel decrease
        */
        this.setState({playLevel : Math.max(this.state.playLevel - this.state.decreaseRatePlay * timeSinceUpdate * this.state.speed, 0)});
    }

    updateSmoke(timeSinceUpdate){
        /*
        make the smoke decrease by evaporation and increase depending on smoking quantity
        */
        this.setState({smoke : Math.max(this.state.smoke - this.state.decreaseRateSmoke * timeSinceUpdate * this.state.speed, 0)})
    }

    onClickSleep = () => {
        /*
        alpha : a parameter that defines how much the sleep is good depending on smoke quantity
        */
        if (this.getTime() < this.state.timeToBed){
            return null;
        }

        let alpha = (100 - this.state.smoke) / 100
        alpha = alpha*0.8+0.2
        this.setState({sleepLevel : this.state.sleepLevel + alpha * (100 - this.state.sleepLevel)});
        //Rend le pet indispo pendant 2 heures 
        this.setState({timeToBed : this.getTime() + this.hoursToMs(2/this.state.speed)});
        this.setState({feeling : "sleepy"});
    }

    onClickFeed = () => {
        /*Make the hunger level increase*/
        if (this.getTime() < this.state.timeToBed){
            return null;
        }

        this.setState({hungerLevel : Math.min(this.state.hungerLevel + 10, 100)});
    }

    onClickPlay = () => {
        /*Make the play level increase and the energy level decrease*/
        if (this.getTime() < this.state.timeToBed){return null;}

        if (this.state.feeling !== "angry"){
            this.setState({playLevel : Math.min(this.state.playLevel + 10, 100)});
            this.setState({sleepLevel : Math.max(this.state.sleepLevel - 5, 0)});
        }else {
            /*Send a message and make the pet unusable for some time*/
        }
        
    }

    handleLogout = () => {
        this.props.onLogout()
        this.props.history.goBack()
    }

    

    render(){
        
        return(
            <div className="wrapper">
               <button className="log-out" onClick = {this.handleLogout}>Log out</button>
            
               <div>
                    <div className="pet-area">   
                        <Pet />
                        <img class="superpose" className="pet-area-img"  src={gameBackground} alt="Background"/>
                        <img class="superpose" className="smoke-img"  src={smoke} />
                    </div>
                </div>
               
                    
                <div className="containers">
                    <div className="container1">
                        <div className="containergauge1">
                            <Gauge className="gauge" value={this.state.playLevel} label={'Plaisir'} colorRange={["#ffe6f9", "#b30086"]}/>
                        </div>
                        <div className="containerbutton1">
                            <MyButton type='jouer' handleThis={this.onClickPlay}/>
                        </div>
                    </div>
                    <div className="container2">
                        <div className="containergauge2">
                            <Gauge className="gauge" value={this.state.hungerLevel} label={'Faim'} colorRange={["#fffedc", "#ff9200"]}/>
                        </div>
                        <div className="containerbutton2">
                            <MyButton type='manger' handleThis={this.onClickFeed}/>
                        </div>
                    </div>
                    <div className="container3">
                        <div className="containergauge3">
                            <Gauge className="gauge" value={this.state.sleepLevel} label = {'Energie'} colorRange={["#dbdbe7", "#4834d4"]}/>
                        </div>
                        <div className="containerbutton3">
                            <MyButton type='dormir' handleThis={this.onClickSleep}/>
                        </div>
                    </div> 
                </div> 
                
            </div>
        )
    }
}

export default withRouter(House);
