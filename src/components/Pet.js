import React from 'react';
import char from '../assets/m2.png';


export default class Pet extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            IsAlive: true,
            IsFriendly: true
        };
    }

    render(){
        return(
            <div>
                <style jsx>
                {`
                .pet{
                    position: absolute;
                    top: 63%;
                    left: 33%;
                    animation-name: moving;
                    animation-duration: 10s;
                    animation-direction: alternate;
                    animation-iteration-count: infinite;
                    z-index: 1;
                }
                .pet-img {
                    width: 10vw;
                    height: 10vw;
                }
                @keyframes moving {
                    0%   {left: 53%;}
                    25%  {left: 33%;}
                    50%  {left: 13%;}
                    100% {left: 23%;}
                }
          `}
                </style>
                    <div className="pet">
                        <img className="pet-img" src={char}/>
                    </div>
                </div>
        )
    }
}