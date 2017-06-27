import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ScrollView from '../../components/scrollView/VerticalScrollView';

export default class News extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
				1, 2, 3, 4, 5, 6, 7, 8, 9, 20,
				1, 2, 3, 4, 5, 6, 7, 8, 9, 30],
		};
		this.loading = false;
	}

	reload = () => {
		if (!this.loading) {
			this.loading = true;
			setTimeout(() => {
				this.setState({ list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
					1, 2, 3, 4, 5, 6, 7, 8, 9, 20,
					1, 2, 3, 4, 5, 6, 7, 8, 9, 30] }, () => {
					this.loading = false;
					console.log('reload');
				});
			}, 500);
		}
	}

	loadMore = () => {
		if (!this.loading) {
			this.loading = true;
			setTimeout(() => {
				const list = this.state.list.concat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
				this.setState({ list }, () => {
					this.loading = false;
					console.log('load more');
				});
			}, 1000);
		}
	}

	render() {
		return (<ScrollView
			{...this.props}
			threshold={30}
			onScrollTop={this.reload}
			onScrollBottom={this.loadMore}
		>
			<ul>
				{this.state.list.map((val, index) => <li key={index}>{val}</li>)}
			</ul>
		</ScrollView>);
	}
}

test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<News />, div);
});
