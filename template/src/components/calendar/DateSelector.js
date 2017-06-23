import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Calendar from './Calendar';
import styles from './date-selector.less';

export default class DateSelector extends Component {
	static propTypes = {
		date: PropTypes.string,
		className: PropTypes.string,
		onSelected: PropTypes.func,
	}

	static defaultProps = {
		date: '',
		className: '',
		onSelected: () => {},
	}

	state = {
		selecting: false,
		date: '0000-00-00',
	}

	componentDidMount() {
		this.setDate(this.props.date);
		this.switcher.addEventListener('click', this.toggleCalendar, false);
		this.today.addEventListener('click', this.handleToday, false);
		this.submit.addEventListener('click', this.handleSubmit, false);
	}

	componentWillUnmount() {
		this.switcher.removeEventListener('click', this.toggleCalendar);
		this.today.removeEventListener('click', this.handleToday);
		this.submit.removeEventListener('click', this.handleSubmit);
	}

	setDate = date => {
		if (this.calendar) {
			const ymd = date.replace(/\//g, '-').split('-');
			const year = parseInt(ymd[0], 10);
			const month = parseInt(ymd[1], 10);
			if (typeof year === 'number' && year >= 2000 && year < 2100 && typeof month === 'number' && month >= 1 && month <= 12) {
				this.calendar.setYearMonth(year, month);
			}			else {
				const d = new Date();
				this.calendar.setYearMonth(d.getFullYear(), d.getMonth() + 1);
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

	handleToday = async () => {
		const d = new Date();
		const year = d.getFullYear();
		const month = d.getMonth() + 1;
		const m = month < 10 ? `0${month}` : month;
		const date = d.getDate();
		const day = date < 10 ? `0${date}` : date;
		const today = `${year}-${m}-${day}`;

		this.setDate(today);
		await this.calendar.clearSelected();
		await this.calendar.setSelected(today);

		this.setState({ date: today, selecting: false });
		if (this.props.onSelected) {
			this.props.onSelected(today);
		}
	}

	handleSubmit = () => {
		const selected = this.calendar.getSelected();
		if (selected.length === 1) {
			const date = selected[0];
			this.setState({ date, selecting: false });
			if (this.props.onSelected) {
				this.props.onSelected(date);
			}
		}
	}

	handleSelected = async date => {
		await this.calendar.clearSelected();
		await this.calendar.setSelected(date);
	}

	render() {
		const display = this.state.selecting ? styles.show : styles.hide;
		return (<div {...this.props} className={[styles['date-selector'], this.props.className].join(' ')}>
			<div className={styles['date-info']} ref={ref => { this.switcher = ref; }}>
				{this.state.date}
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
