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
            petIsAlive: true,
            smokingScore: 1,
            timeToBed : 0,
            decreaseRateEnergy : 25,
            decreaseRateHunger : 25,
            decreaseRatePlay : 25,
            decreaseRateSmoke : 25,
            lastUpdateTime : d.getTime(),
            speed : 1,
            feeling : "normal",
        };

        API.get('/People', {params : {pseudo : this.props.currentUser}})
            .then(resp =>(resp.data.length===1 ? this.initUser():this.initDemo()))
    }

    initUser = ()=>{
        API.get('/People', {params : {pseudo : this.props.currentUser}})
            .then(resp => {
                this.setState({objnic : resp.data[0].objnic,
                    qtnic : resp.data[0].qtnic,
                    objvap : resp.data[0].objvap,
                    hungerLevel: resp.data[0].tamas[0].faim,
                    sleepLevel : resp.data[0].tamas[0].energie,
                    playLevel : resp.data[0].tamas[0].plaisir,
                    smoke : resp.data[0].tamas[0].smoke,
                    tama : resp.data[0].tamas[0].nom,
                });
            });
    }

    initDemo = ()=>{
        this.setState({objnic : 2,
            qtnic : 2,
            objvap : 100,
            hungerLevel : 40,
            sleepLevel : 100,
            playLevel : 100,
            smoke : 50,
            tama : "bulbi",
        });
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
        if (this.props.currentUser !== ""){
        API.get('/Peufs', {params : {pseu : pseudo}})
            .then(resp => {
                this.setState({lastHourPeuf : resp.data[resp.data.length - 1].total});
            });
        }else{
            this.setState({lastHourPeuf : 99})
        }
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
        }else if(this.state.lastHourPeuf > this.state.objvap*1.1){
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
        this.setState({smoke : Math.max(this.state.smoke - this.state.decreaseRateSmoke * timeSinceUpdate * this.state.speed, 0)})
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
                        <Pet feeling = {this.state.feeling} name={this.state.tama}/>
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
