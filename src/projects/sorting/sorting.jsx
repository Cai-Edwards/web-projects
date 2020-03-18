//Adapted from the following tutorial: https://www.youtube.com/watch?v=pFXYym4Wbkc
//By Clément Mihailescu

import React from 'react';
import './sorting.css'
import {bubbleSort, selectionSort, quickSort} from './algorithms'

export class Sorting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            height: 1,
            margin: 1
        };
        this.resetArray = this.resetArray.bind(this);
        this.animate = this.animate.bind(this);
    }

    componentDidMount() {
        this.resetArray();
        return
    }

    resetArray() {
        const num = document.getElementById('num-bars').value;

        const width = document.getElementById('sorting-container').offsetWidth;
        const height = document.getElementById('sorting-container').offsetHeight;
        const bars = document.getElementsByClassName('sorting-bar');
        let bar_height = Math.floor((height)/num) || 1;
        const arr = [];

        for (let i = 0; i < num; i++) {
            arr.push(Math.random()*width);
        };

        for (let i = 0; i < bars.length; i++) {
            bars[i].style.backgroundColor = 'white';
        }

        this.setState({array: arr, height: bar_height});
        
        return;
    }

    animate(func) {
        document.getElementById('sorting-container').scrollIntoView();

        const bars = document.getElementsByClassName('sorting-bar');
        const animations = func(this.state.array);
        const comparison_colour = 'red';
        const swap_colour = 'blue';
        const confirmed_colour = 'Chartreuse';
        const pivot_colour = 'violet'
        let before = []
        const speed = document.getElementById('speed').value
        let changed = [];
        let barone;
        let bartwo;

        for (let i = 0; i < animations.length; i++) {
            
            setTimeout(() => {

                for (let k = 0; k < changed.length; k++) {
                    changed[k].style.backgroundColor = before[k];
                }

                changed = []
                before = []

                switch (Object.keys(animations[i])[0]) {
                    case 'compare':
                        barone = bars[animations[i].compare[0]];
                        bartwo = bars[animations[i].compare[1]]

                        before.push(barone.style.backgroundColor, bartwo.style.backgroundColor);

                        barone.style.backgroundColor = comparison_colour;
                        bartwo.style.backgroundColor = comparison_colour;

                        changed.push(barone, bartwo)
                        
                        break;

                    case 'swap':
                        barone = bars[animations[i].swap[0]];
                        bartwo = bars[animations[i].swap[1]];

                        let temp = barone.style.width;
                        barone.style.width = bartwo.style.width
                        bartwo.style.width = temp

                        before.push(barone.style.backgroundColor, bartwo.style.backgroundColor);
                        
                        barone.style.backgroundColor = swap_colour;
                        bartwo.style.backgroundColor = swap_colour;
                        
                        changed.push(barone, bartwo)

                        break;

                    case 'confirmed':
                        bars[animations[i].confirmed].style.backgroundColor = confirmed_colour;
                        break;

                    case 'pivot':
                        bars[animations[i].pivot].style.backgroundColor = pivot_colour;
                        break;

                    default:
                        break;
                }
                
            }, i * speed)
        }
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
                <footer>
                    <button onClick={this.resetArray}>New array</button>
                    <button onClick={() => this.animate(bubbleSort)}>Bubble sort</button>
                    <button onClick={() => this.animate(selectionSort)}>Selection sort</button>
                    <button onClick={() => this.animate(quickSort)}>Quick sort</button>
                    <input id='num-bars' type='number' min='0' defaultValue='100' />
                    <input id='speed' type='number' min='0' defaultValue='1' />
                </footer>
            </div>
        );
    }
}
