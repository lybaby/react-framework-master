import React from 'react';
import PropTypes from 'prop-types';
import Loading from './loading';

class imgLoading extends React.Component {
    static propTypes = {
        imageUrl: PropTypes.string,
    };
    static defaultProps = {
        imageUrl: '',
    };
    constructor(props) {
        super(props);
        this.state = { imageStatus: null };
        // Loading.show();
        this.handleImageErrored = this.handleImageErrored.bind(this);
    }

    handleImageLoaded = () => {
        this.setState({ imageStatus: Loading.close() });
    }

    handleImageErrored() {
        this.setState({ imageStatus: 'failed to load' });
    }


    render() {
        return (
            <div>
                <img
                    src={this.props.imageUrl}
                    onLoad={this.handleImageLoaded}
                    onError={this.handleImageErrored}
                    alt=""
                />
                {this.state.imageStatus}
            </div>
        );
    }
}
export default imgLoading;
