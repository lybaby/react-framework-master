import React, { Component } from 'react';
import timer from '../../components/timer/timer';

export default class TimerTest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timer1: 30,
			timer2: 10,
		};
		this.t1 = null;
		this.t2 = null;
		this.tick = null;
	}

	componentWillMount() {
		this.tick = timer.initTimer(1000, () => {
			const timer1 = this.t1 ? this.state.timer1 - 1 : 0;
			const timer2 = this.t2 ? this.state.timer2 - 1 : 0;
			this.setState({ timer1, timer2 });
		});
		this.t1 = timer.initTimer(30000, () => {
			timer.clearTimer(this.t1);
			this.t1 = null;
		}, false);
		this.t2 = timer.initTimer(10000, () => {
			this.setState({ timer2: 10 });
		});
	}

	componentWillUnmount() {
		timer.clearTimer(this.tick);
		timer.clearTimer(this.t2);
	}

	render() {
		return (<div>
			<div>timer 1: 30s <span>{this.state.timer1}</span></div>
			<div>timer 2: 10s repeat <span>{this.state.timer2}</span></div>
			<button disabled={this.state.timer1 > 0 ? 'disabled' : false}>button</button>
		</div>);
	}
}
