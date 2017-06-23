import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './calendar.less';

export default class Calendar extends Component {
	static propTypes = {
		onSelected: PropTypes.func,
	}

	static defaultProps = {
		onSelected: () => {},
	}

	constructor(props) {
		super(props);
		this.state = {
			currentYear: 2017,
			currentMonth: 6,
			currentDates: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
				11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
				21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
			],
			previousYear: 2017,
			previousMonth: 5,
			previousDates: [28, 29, 30, 31],
			nextYear: 2017,
			nextMonth: 7,
			nextDates: [1, 2, 3, 4, 5, 6, 7, 8],
			selected: {},
		};
	}

	componentDidMount() {
		this.previous.addEventListener('click', this.handlePrevious, false);
		this.next.addEventListener('click', this.handleNext, false);
	}

	componentWillUnmount() {
		this.previous.removeEventListener('click', this.handlePrevious);
		this.next.removeEventListener('click', this.handleNext);
	}

	getSelected = () => Object.keys(this.state.selected).sort()

	setSelected = date => {
		const selected = this.state.selected;
		selected[date] = date;
		this.setState({ selected });
	}

	setYearMonth = (year, month) => {
		const currentYear = year;
		const currentMonth = month;
		let days = this.calcMonthDates(currentYear, currentMonth);
		const currentDates = [];
		for (let i = 1; i <= days; i += 1) {
			currentDates.push(i);
		}

		let previousYear = currentYear;
		let previousMonth = currentMonth - 1;
		if (previousMonth === 0) {
			previousYear -= 1;
			previousMonth = 12;
		}
		const previousDates = [];
		const week = (new Date(currentYear, currentMonth - 1, 1, 0, 0, 0, 0)).getDay();
		if (week > 0) {
			days = this.calcMonthDates(previousYear, previousMonth);
			for (let i = 0; i < week; i += 1) {
				previousDates.unshift(days - i);
			}
		}

		let nextYear = currentYear;
		let nextMonth = currentMonth + 1;
		if (nextMonth === 13) {
			nextYear += 1;
			nextMonth = 1;
		}
		const nextDates = [];
		let dates = previousDates.length + currentDates.length;
		if (dates !== 42) {
			days = this.calcMonthDates(nextYear, nextMonth);
			for (let i = 1; dates < 42; i += 1, dates += 1) {
				nextDates.push(i);
			}
		}

		this.setState({
			currentYear,
			currentMonth,
			currentDates,
			previousYear,
			previousMonth,
			previousDates,
			nextYear,
			nextMonth,
			nextDates,
		});
	}

	handlePrevious = () => {
		if (this.state.currentMonth === 1) {
			this.setYearMonth(this.state.currentYear - 1, 1);
		}		else {
			this.setYearMonth(this.state.currentYear, this.state.currentMonth - 1);
		}
	}

	handleNext = () => {
		if (this.state.currentMonth === 12) {
			this.setYearMonth(this.state.currentYear + 1, 1);
		}		else {
			this.setYearMonth(this.state.currentYear, this.state.currentMonth + 1);
		}
	}

	calcMonthDates = (year, month) => {
		const dates = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		let days = dates[month];
		if ((year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) && month === 2) {
			days += 1;
		}
		return days;
	}

	handleSelect = date => {
		const month = this.state.currentMonth < 10 ? `0${this.state.currentMonth}` : this.state.currentMonth;
		const d = date < 10 ? `0${date}` : date;
		const day = `${this.state.currentYear}-${month}-${d}`;
		this.props.onSelected(day);
	}

	cancelSelected = date => {
		const selected = this.state.selected;
		delete selected[date];
		this.setState({ selected });
	}

	toggleSelected = date => {
		const selected = this.state.selected;
		if (selected[date]) {
			delete selected[date];
		}		else {
			selected[date] = date;
		}
		this.setState({ selected });
	}

	clearSelected = () => {
		this.setState(() => ({
			selected: {},
		}));
	}

	hasSelected = date => {
		const month = this.state.currentMonth < 10 ? `0${this.state.currentMonth}` : this.state.currentMonth;
		const d = date < 10 ? `0${date}` : date;
		const day = `${this.state.currentYear}-${month}-${d}`;
		return day in this.state.selected;
	}

	render() {
		console.log(styles);
		return (<div className={styles.calendar}>
			<div className={styles.year}>
				<span className={styles.previous} title="上月" ref={ref => { this.previous = ref; }}>&lt;</span>
				<span className={styles.month}>{this.state.currentYear}年{this.state.currentMonth}月</span>
				<span className={styles.next} title="下月" ref={ref => { this.next = ref; }}>&gt;</span>
			</div>
			<div className={styles.week}>
				<span className={styles.weekend}>日</span>
				<span>一</span>
				<span>二</span>
				<span>三</span>
				<span>四</span>
				<span>五</span>
				<span className={styles.weekend}>六</span>
			</div>
			<div className={styles.dates}>
				{
					this.state.previousDates.map(date => (<span
							className={styles['previous-month']}
							key={`${this.state.previousYear}-${this.state.previousMonth}-${date}`}
					>
							{date}
						</span>))
				}
				{
					this.state.currentDates.map((date, index) => (<span
							role="button"
							tabIndex={index}
							className={this.hasSelected(date) ? styles.selected : ''}
							onClick={() => this.handleSelect(date)}
							key={`${this.state.currentYear}-${this.state.currentMonth}-${date}`}
					>
							{date}
						</span>))
				}
				{
					this.state.nextDates.map(date => (<span
							className={styles['next-month']}
							key={`${this.state.nextYear}-${this.state.nextMonth}-${date}`}
					>
							{date}
						</span>))
				}
			</div>
		</div>);
	}
}
