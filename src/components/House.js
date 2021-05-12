import React from 'react';
import gameBackground from '../assets/gameBackground.png';
import Pet from './Pet';
import MyButton from './MyButton'


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
                        <MyButton type='plaisir' handleThis={this.handle_this}/>
                    </div>
                    <div className="button">
                        <button>Dormir</button>
                    </div>
                    <div className="button">
                        <button>Manger</button>
                    </div>
                </div>
            </div>
    </div>
        )
    }
}
