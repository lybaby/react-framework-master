import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Calendar from './Calendar';
import styles from './date-selector.less';

export default class DateRangeSelector extends Component {
	static propTypes = {
		begin: PropTypes.string,
		end: PropTypes.string,
		className: PropTypes.string,
		onSelected: PropTypes.func,
	}

	static defaultProps = {
		begin: '',
		end: '',
		className: '',
		onSelected: () => {},
	}

	constructor(props) {
		super(props);
		this.state = {
			selecting: false,
			begin: '0000-00-00',
			end: '0000-00-00',
		};
	}

	componentDidMount() {
		this.setRange(this.props.begin, this.props.end);
		this.switcher.addEventListener('click', this.toggleCalendar, false);
		this.today.addEventListener('click', this.handleToday, false);
		this.submit.addEventListener('click', this.handleSubmit, false);
	}

	componentWillUnmount() {
		this.switcher.removeEventListener('click', this.toggleCalendar);
		this.today.removeEventListener('click', this.handleToday);
		this.submit.removeEventListener('click', this.handleSubmit);
	}

	setRange = async (begin, end) => {
		if (this.calendar) {
			const ymd = begin.replace(/\//g, '-').split('-');
			const year = parseInt(ymd[0], 10);
			const month = parseInt(ymd[1], 10);
			if (typeof year === 'number' && year >= 2000 && year < 2100 && typeof month === 'number' && month >= 1 && month <= 12) {
				this.calendar.setYearMonth(year, month);
				const prefix = month < 10 ? `${year}-0${month}` : `${year}-${month}`;
				await this.calendar.clearSelected();
				const from = parseInt(ymd[2], 10);
				const to = parseInt(end.replace(/\//g, '-').split('-')[2], 10);
				const a = Math.min(from, to);
				const b = Math.max(from, to);
				for (let i = a; i <= b; i += 1) {
					const c = i < 10 ? `0${i}` : i;
					this.calendar.setSelected(`${prefix}${c}`);
				}
			}			else {
				const d = new Date();
				const y = d.getFullYear();
				const m = d.getMonth() + 1;
				const date = d.getDate();
				this.calendar.setYearMonth(y, m);
				await this.calendar.clearSelected();
				const c = date < 10 ? `0${date}` : date;
				this.calendar.setSelected(m < 10 ? `${y}-0${m}-${c}` : `${y}-${m}-${c}`);
			}
		}
	}

	showCalendar = () => {
		this.setState({ selecting: true });
	}

	hideCalendar = () => {
		this.setState({ selecting: false });
	}

	toggleCalendar = () => {
		this.setState({ selecting: !this.state.selecting });
	}

	handleSubmit = () => {
		const selected = this.calendar.getSelected();
		if (selected.length > 1) {
			const begin = selected[0];
			const end = selected[selected.length - 1];
			this.setState({ begin, end, selecting: false });
			if (this.props.onSelected) {
				this.props.onSelected(begin, end);
			}
		}
	}

	handleToday = async () => {
		const d = new Date();
		const year = d.getFullYear();
		let month = d.getMonth() + 1;
		if (month < 10) {
			month = `0${month}`;
		}
		let date = d.getDate();
		if (date < 10) {
			date = `0${date}`;
		}
		const today = `${year}-${month}-${date}`;

		this.setRange(today, today);
		await this.calendar.clearSelected();
		this.calendar.setSelected(today);

		this.setState({ begin: today, end: today, selecting: false });
		if (this.props.onSelected) {
			this.props.onSelected(today, today);
		}
	}

	handleSelected = async date => {
		const selected = this.calendar.getSelected();
		const count = selected.length;
		if (count === 0) {
			this.calendar.setSelected(date);
		}		else if (count === 1) {
			const first = selected[0];
			if (date !== first) {
				const prefix = first.substring(0, 8);
				const from = parseInt(first.split('-')[2], 10);
				const to = parseInt(date.split('-')[2], 10);
				const a = Math.min(from, to);
				const b = Math.max(from, to);
				for (let i = a; i <= b; i += 1) {
					const c = i < 10 ? `0${i}` : i;
					this.calendar.setSelected(`${prefix}${c}`);
				}
			}
		}		else {
			await this.calendar.clearSelected();
			await this.calendar.setSelected(date);
		}
	}

	render() {
		const display = this.state.selecting ? styles.show : styles.hide;
		return (<div {...this.props} className={[styles['date-selector'], styles['date-range-selector'], this.props.className].join(' ')}>
			<div className={[styles['date-info'], styles['date-range-info']].join(' ')} ref={ref => { this.switcher = ref; }}>
				<span className={styles['date-begin']}>{this.state.begin}</span>
				<span>&nbsp;~&nbsp;</span>
				<span className={styles['date-end']}>{this.state.end}</span>
			</div>
			<div className={[styles['calendar-container'], display].join(' ')}>
				<Calendar ref={ref => { this.calendar = ref; }} onSelected={this.handleSelected} />
				<div className={styles.buttons}>
					<a className={[styles.button, styles.today].join(' ')} ref={ref => { this.today = ref; }}>今天</a>
					<a className={styles.button} ref={ref => { this.submit = ref; }}>确定</a>
				</div>
			</div>
		</div>);
	}
}
