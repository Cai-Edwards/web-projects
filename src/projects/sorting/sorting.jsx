//Adapted from the following tutorial: https://www.youtube.com/watch?v=pFXYym4Wbkc
//By Clément Mihailescu

import React from 'react';
import './sorting.css'
import {bubbleSort} from './algorithms'

export class Sorting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            height: 1
        };
        this.resetArray = this.resetArray.bind(this);
        this.animate = this.animate.bind(this);

    }

    componentDidMount() {
        this.resetArray();
        
        return
    }

    resetArray() {
        const num = 100;
        const width = document.getElementById('sorting-container').offsetWidth;
        const height = document.getElementById('sorting-container').offsetHeight;
        let bar_height = Math.floor((height - num)/num) || 1
        
        const arr = []

        for (let i = 0; i < num; i++) {
            arr.push(Math.random()*width)
        };

        this.setState({array: arr, height: bar_height});
        
        return;
    }

    animate() {
        const bars = document.getElementsByClassName('sorting-bar');
        const animations = bubbleSort(this.state.array);
        const comparison_colour = 'red';
        const speed = 1
        let changed = []
        let barone;
        let bartwo;

        for (let i = 0; i < animations.length; i++) {
            
            setTimeout(() => {

                for (let k = 0; k < changed.length; k++) {
                    changed[k].style.backgroundColor = 'white';
                }

                changed = []

                switch (Object.keys(animations[i])[0]) {
                    case 'compare':
                        barone = bars[animations[i].compare[0]];
                        bartwo = bars[animations[i].compare[1]]

                        barone.style.backgroundColor = comparison_colour;
                        bartwo.style.backgroundColor = comparison_colour;

                        changed.push(barone, bartwo)
                        
                        break;

                    case 'swap':
                        barone = bars[animations[i].swap[0]].style.width;
                        bars[animations[i].swap[0]].style.width = bars[animations[i].swap[1]].style.width
                        bars[animations[i].swap[1]].style.width = barone
                        break;

                    default:
                        break;
                }
                
            }, i * speed)
        }

        setTimeout(() => {
            bars[0].style.backgroundColor = 'white';
            bars[1].style.backgroundColor = 'white';
        }, animations.length*speed)

    }

    render() {
        const arr = this.state.array;
        const height = this.state.height;
        return (
            <div>
                <div id='sorting-container'>
                    {arr.map((value, index) => (
                        <div 
                            className='sorting-bar' 
                            key={index}
                            style={{
                                width: value, 
                                height: height}}></div>
                    ))}
                </div>

                <button onClick={this.resetArray}>New array</button>
                <button onClick={this.animate}>Bubble sort</button>

            </div>
        );        
    }
}
