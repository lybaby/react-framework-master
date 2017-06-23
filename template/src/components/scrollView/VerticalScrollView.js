import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TouchableView from './TouchableView';

export default class VerticalScrollView extends Component {
	static propTypes = {
		threshold: PropTypes.number,
		onScrollTop: PropTypes.func.isRequired,
		onScrollBottom: PropTypes.func.isRequired,
		children: PropTypes.node.isRequired,
	}

	static defaultProps = {
		threshold: 0,
	}

	componentDidMount() {
		document.addEventListener('mousewheel', this.onScroll, false);
	}

	componentWillUnmount() {
		document.removeEventListener('mousewheel', this.onScroll);
	}

	onScroll = () => {
		const height = document.documentElement.clientHeight;
		const c = document.body;
		const h = c.scrollTop + height + (parseInt(this.props.threshold, 10) || 0);
		if (h >= c.scrollHeight && this.props.onScrollBottom) {
			this.props.onScrollBottom();
		}
	}

	dragDown = offset => {
		const c = document.body;
		if (c.scrollTop - offset <= 0 && this.props.onScrollTop) {
			this.props.onScrollTop();
		}
		this.view.scrollTop = this.view.scrollTop - offset;
	}

	dragUp = offset => {
		const height = document.documentElement.clientHeight;
		const c = document.body;
		const h = c.scrollTop + height + (parseInt(this.props.threshold, 10) || 0) + offset;
		if (h >= c.scrollHeight && this.props.onScrollBottom) {
			this.props.onScrollBottom();
		}
		this.view.scrollTop = this.view.scrollTop + offset;
	}

	render() {
		return (<TouchableView
			{...this.props}
			ref={ref => { this.view = ref; }}
			onDragUp={this.dragUp}
			onDragDown={this.dragDown}
		>
			{this.props.children}
		</TouchableView>);
	}
}
