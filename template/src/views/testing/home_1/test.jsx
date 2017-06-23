import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from './test.css';

class Test extends Component {
  static propTypes = {
    name: PropTypes.string,
  };
  static defaultProps = {
    name: 'test',
  };
  constructor(props) {
    super(props);
    this.state = { isShow: false };
  }
  componentWillMount() {
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <div className={css.test}>
        <div className={css['test-div']}>
          <h2>Welcome to React</h2>
          <Link to="/">Topics</Link>
          <div>{this.props.name}</div>
        </div>
      </div>
    );
  }
}

export default Test;
