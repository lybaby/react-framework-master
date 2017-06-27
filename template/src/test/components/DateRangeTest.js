import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DateRangeSelector from '../../components/calendar/DateRangeSelector';
import DateSelector from '../../components/calendar/DateSelector';

export default class DateRangeTest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			begin: '----/--/--',
			end: '----/--/--',
			date: '----/--/--',
		};
	}

	onSelected = (begin, end) => {
		this.setState({ begin, end });
	}

	onSelected2 = date => {
		this.setState({ date });
	}

	render() {
		return (<div>
			<p>
				苏丹反核扩散地方所担负所担负
				<DateRangeSelector className="iOS" begin={this.state.begin} end={this.state.end} onSelected={this.onSelected} ref={ref => { this.selector = ref; }} />
				速度粉碎机地方散地方所担负所
				<DateSelector className="iOS" date={this.state.date} onSelected={this.onSelected2} ref={ref => { this.selector2 = ref; }} />
				散地方所担负所
			</p>
			<p>begin: {this.state.begin}</p>
			<p>end: {this.state.end}</p>
			<p>date: {this.state.date}</p>
		</div>);
	}
}


test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DateRangeTest />, div);
});
