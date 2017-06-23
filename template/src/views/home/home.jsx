/* eslint-disable no-trailing-spaces */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './home.css';

class Home extends Component {
    static propTypes = {
        name: PropTypes.string,
    };
    static defaultProps = {
        name: 'test',
    };

    constructor(props) {
        super(props);
        this.state = { isShow: false };
    }

    componentWillMount() {

    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }

    render() {
        return (
            <div className={css.home}>
                <div className={css['home-div']}>
                    <h2>Welcome to React</h2>
                </div>
            </div>
        );
    }
}

export default Home;
