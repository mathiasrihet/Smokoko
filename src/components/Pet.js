import React from 'react';
import API from './api'

export default class Pet extends React.Component {
    constructor(props){
        super(props);
        this.state={}

        API.get('/Tamas', {params : {nom : props.name}})
            .then(resp => {
                this.setState({
                    normal: resp.data[0].normal.url,
                    angry : resp.data[0].angry.url,
                    sleepy : resp.data[0].sleepy.url,
            });
        });
    };

    

    render(){
        return(
            <div>
                <style jsx>
                {`
                .pet{
                    position: absolute;
                    top: 68%;
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
                    50%  {left: 55%;}
                    100% {left: 33%;}
                }
          `}
                </style>
                    <div className="pet">
                        <img className="pet-img" src={"http://localhost:1337"+this.state[this.props.feeling]} alt={this.props.feeling}/>
                    </div>
                </div>
        )
    }
}
// src={this.state[this.props.feeling]}