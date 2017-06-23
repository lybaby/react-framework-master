import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BreakView extends Component {
    static propTypes = {
        breakLabel: PropTypes.object,
        breakClassName: PropTypes.string
    };

    componentWillMount() {

    }

    render() {
        const label = this.props.breakLabel;
        const className = this.props.breakClassName || 'break';
        return (
            <li className={className}>
                {label}
            </li>
        );
    }

}

export default BreakView;
