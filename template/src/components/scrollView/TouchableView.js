import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TouchableView extends Component {
	static propTypes = {
		onDragLeft: PropTypes.func,
		onDragRight: PropTypes.func,
		onDragUp: PropTypes.func,
		onDragDown: PropTypes.func,
		children: PropTypes.node.isRequired,
	}

	static defaultProps = {
		onDragLeft: () => {},
		onDragRight: () => {},
		onDragUp: () => {},
		onDragDown: () => {},
	}

	componentDidMount() {
		const el = this.view;
		el.addEventListener('touchstart', this.handleStart, false);
		el.addEventListener('touchend', this.handleEnd, false);
		el.addEventListener('touchcancel', this.handleCancel, false);
		el.addEventListener('touchmove', this.handleMove, false);
	}

	componentWillUnmount() {
		const el = this.view;
		el.removeEventListener('touchstart', this.handleStart);
		el.removeEventListener('touchend', this.handleEnd);
		el.removeEventListener('touchcancel', this.handleCancel);
		el.removeEventListener('touchmove', this.handleMove);
	}

	ing = false
	touches = []
	orientation = null

	handleStart = e => {
		this.ing = true;
		this.touches = e.changedTouches;
	}

	handleEnd = () => {
		this.ing = false;
		this.orientation = null;
	}

	handleCancel = () => {
		this.ing = false;
		this.orientation = null;
	}

	handleMove = e => {
		if (this.ing) {
			const x0 = this.touches[0].clientX;
			const y0 = this.touches[0].clientY;
			const x1 = e.changedTouches[0].clientX;
			const y1 = e.changedTouches[0].clientY;
			if (this.orientation === null) {
				this.orientation = Math.abs(x1 - x0) > Math.abs(y1 - y0) ? 'horizontal' : 'vertical';
			}
			if (this.orientation === 'horizontal') {
				if (x1 > x0 && this.props.onDragRight) {
					this.props.onDragRight(x1 - x0);
				}				else if (x0 > x1 && this.props.onDragLeft) {
					this.props.onDragLeft(x0 - x1);
				}
			}			else if (y1 > y0 && this.props.onDragDown) {
					this.props.onDragDown(y1 - y0);
				}				else if (y0 > y1 && this.props.onDragUp) {
					this.props.onDragUp(y0 - y1);
				}
			this.touches = e.changedTouches;
		}
	}

	render() {
		return (<div {...this.props} ref={ref => { this.view = ref; }}>
			{this.props.children}
		</div>);
	}
}
