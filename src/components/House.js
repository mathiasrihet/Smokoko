import React from 'react';
import gameBackground from '../assets/gameBackground.png';
import Pet from './Pet';


export default class House extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            smoke: 50,
            petIsAlive: true
        };
    }

    render(){
        return(
            <div>
                <style jsx>
                {`
                .pet-area {
                    position: absolute;
                    height: 300px;
                    width: 800px;
                    top: 26px;
                    left: 85px;
                }
                .pet-area-img {
                    height: 447px;
                    width: 586px;
                    z-index: 0;
                }
          `}
                </style>
                <div className="level-container">
                    <Pet />
                    <div className="pet-area">
                        <img className="pet-area-img" src={gameBackground}/>
                    </div>
                </div>
            </div>
        )
    }
}
