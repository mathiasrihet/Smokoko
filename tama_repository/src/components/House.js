import React from 'react';
import API from './api'
import Pet from './Pet';
import MyButton from './MyButton'
import Gauge from './Gauge'
import { withRouter } from 'react-router-dom';

import gameBackground from '../assets/gameBackground.png';
import smoke from '../assets/smoke.png';

import  './styles/House.css';


class House extends React.Component {
    constructor(props){
        super(props);

        let d = new Date();

        this.state = {
            petIsAlive: true,
            timeToBed : 0,
            decreaseRateEnergy : 25,
            decreaseRateHunger : 25,
            decreaseRatePlay : 25,
            lastUpdateTime : d.getTime(),
            feeling : "normal",

            //Increase to make game's time goes faster (speed 60 set 1 real minute equal to 1 hour, 360 to get 1s = 1H)
            //Still not fully realistic
            speed : 1,
        };

        //Test if the current user exist in the API
        API.get('/People', {params : {pseudo : this.props.currentUser}})
            .then(resp =>(resp.data.length===1 ? this.initUser():this.initDemo()))
    }
    
    //Get data from the API
    initUser = ()=>{
        API.get('/People', {params : {pseudo : this.props.currentUser}})
            .then(resp => {
                this.setState({objnic : resp.data[0].objnic,
                    qtnic : resp.data[0].qtnic,
                    objvap : resp.data[0].objvap,
                    hungerLevel: resp.data[0].tamagotchis[0].hunger,
                    sleepLevel : resp.data[0].tamagotchis[0].energy,
                    playLevel : resp.data[0].tamagotchis[0].joy,
                    smoke : resp.data[0].tamagotchis[0].smoke,
                    lastHourVap : resp.data[0].vap[resp.data.length - 1].total 
                });
            });
    }

    //Set arbitrary data
    initDemo = ()=>{
        this.setState({objnic : 2,
            qtnic : 2,
            objvap : 100,
            hungerLevel : 40,
            sleepLevel : 100,
            playLevel : 100,
            smoke : 50,
            lastHourVap : 99,
        });
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

    getLastVapRecord(pseudo){
        if (this.props.currentUser !== ""){
        API.get('/Vaps', {params : {pseu : pseudo}})
            .then(resp => {
                if (resp.data.length>0){
                    this.setState({lastHourVap : resp.data[resp.data.length - 1].total});
                }
            });
        }else{
            this.setState({lastHourVap : Math.random()*200 - 100})
        }
    }

    componentDidMount() {
        this.updateInterval = setInterval(() => this.updateLevels(), 1000);
    }

    updateLevels(){
        this.getLastVapRecord(this.props.currentUser);

        let time = this.getTime();
        
        const timeSinceUpdate = this.msToHours(time - this.state.lastUpdateTime);
        //Convert it depending on units of decrease selected
        
        this.setState({lastUpdateTime : time,});
        this.updateFeeling();

        this.updateSmoke(timeSinceUpdate);
        this.updateHunger(timeSinceUpdate);
        this.updatePlay(timeSinceUpdate);
        if (this.state.feeling !== "sleepy"){
            this.updateSleep(timeSinceUpdate);
        }
    }

    updateFeeling(){
        if (this.getTime() < this.state.timeToBed){
            this.setState({feeling : "sleepy"})
        }else if(this.state.lastHourVap > this.state.objvap*1.1){
            this.setState({feeling : "angry"})
        }else{
            this.setState({feeling : "normal"})
        }
    }

    updateHunger(timeSinceUpdate){
        /*
        Make hungerLevel decrease depending on smoking quantity
        timeSinceUpdate is expressed in hours
        */
        const seuilNic = [2,4,8,11,18]

        let alpha = Math.max(1,(seuilNic.indexOf(this.state.qtnic)-seuilNic.indexOf(this.state.objnic))*0.5+1)

        this.setState({hungerLevel : Math.max(this.state.hungerLevel - this.state.decreaseRateHunger * timeSinceUpdate * alpha * this.state.speed, 0)});
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

        let newsmoke = this.state.smoke + (this.state.lastHourVap - this.state.objvap) * timeSinceUpdate * this.state.speed

        this.setState({smoke : Math.min(Math.max(newsmoke, 0),100)})

        let smoke_img = document.getElementsByClassName('smoke-img');
        if(smoke_img[0]){
        smoke_img[0].style.opacity = this.state.smoke/100
        }
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
        // this.setState({feeling : "sleepy"});
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
            alert("Nop.")
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
                        <Pet feeling = {this.state.feeling} name={this.props.currentUser}/>
                        <img class="superpose" className="pet-area-img"  src={gameBackground} alt="Background"/>
                        <img class="superpose" className="smoke-img"  src={smoke} />
                    </div>
                </div>
               
                    
                <div className="containers">
                    <div className="container1">
                        <div className="containergauge1">
                            <Gauge className="gauge" value={this.state.playLevel} label={'joy'} colorRange={["#ffe6f9", "#b30086"]}/>
                        </div>
                        <div className="containerbutton1">
                            <MyButton type='play' handleThis={this.onClickPlay}/>
                        </div>
                    </div>
                    <div className="container2">
                        <div className="containergauge2">
                            <Gauge className="gauge" value={this.state.hungerLevel} label={'hunger'} colorRange={["#fffedc", "#ff9200"]}/>
                        </div>
                        <div className="containerbutton2">
                            <MyButton type='eat' handleThis={this.onClickFeed}/>
                        </div>
                    </div>
                    <div className="container3">
                        <div className="containergauge3">
                            <Gauge className="gauge" value={this.state.sleepLevel} label = {'energy'} colorRange={["#dbdbe7", "#4834d4"]}/>
                        </div>
                        <div className="containerbutton3">
                            <MyButton type='sleep' handleThis={this.onClickSleep}/>
                        </div>
                    </div> 
                </div> 
                
            </div>
        )
    }
}

export default withRouter(House);
