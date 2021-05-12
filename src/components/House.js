import React from 'react';
import gameBackground from '../assets/gameBackground.png';
import Pet from './Pet';
import MyButton from './MyButton'
import Gauge from './Gauge'


export default class House extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            smoke: 50,
            petIsAlive: true,
            hungerLevel : 100,
            sleepLevel : 100,
            playLevel : 100,
        };
    }

    handle_this = () => {
        alert('click')
    }

    render(){
        return(
            <div>
                <style jsx>
                {`
                .pet-area {
                    position: relative;
                    height: 100%;
                    width: 100%;
                    top: 33%;
                    left: 0%;
                }
                .pet-area-img {
                    position : relative;
                    height: 100%;
                    width: 75%;
                    z-index: 0;
                }
                .button-container {
                    display: flex;
                    margin: 10px;
                    padding: 10px;
                }
                .button {
                    margin: 10px;
                }
                `}
                </style>
            <div>
                <div>
                    <div className="pet-area">   
                        <Pet />
                        <img className="pet-area-img" src={gameBackground}/>
                    </div>
                </div>
                <div className="button-container">
                    <div className="button">
                        <MyButton type='Jouer' handleThis={this.handle_this}/>
                        <Gauge value={this.state.playLevel} label={'Plaisir'} colorRange={["#dbe7db", "#48d634"]}/>
                    </div>
                    <div className="button">
                        <MyButton type='Manger' handleThis={this.handle_this}/>
                        <Gauge value={50} label={'Faim'} colorRange={["#dbdbe7", "#4834d4"]}/>
                    </div>
                    <div className="button">
                        <MyButton type='Dormir' handleThis={this.handle_this}/>
                        <Gauge value={80} label={'Energie'} colorRange={["#e7dbdb", "#d44834"]}/>
                    </div>
                </div>
            </div>
    </div>
        )
    }
}
