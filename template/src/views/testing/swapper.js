import React, { Component } from 'react';
import ReactSwipe from '../../components/swipe/reactSwipe';

class Carousel extends Component {

    render() {
        return (
            <ReactSwipe
                className="carousel"
                swipeOptions={{
                    continuous: true,
                    speed: 400,
                    auto: 3000,
                    stopPropagation: true
                }}
            >
                <div>PANE 1</div>
                <div>PANE 2</div>
                <div>PANE 3</div>
            </ReactSwipe>
        );
    }
}


export default Carousel;
