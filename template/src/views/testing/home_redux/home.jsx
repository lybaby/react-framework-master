/* eslint-disable no-trailing-spaces */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from './home.css';
import { successGetUserInfo } from '../../../redux/action';


class Home extends Component {
  static propTypes = {
    name: PropTypes.string,
    dispatch: PropTypes.func
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
  showName(e) {
    e.stopPropagation();
    return this.props.dispatch(successGetUserInfo({
      name: this.props.name,
      userInfo: { useInfo: 'I am xxxx' }
    }
    ));
  }
  render() {
    return (
      <div className={css.home}>
        <div className={css['home-div']}>
          <h2>Welcome to React</h2>
          <Link to="/">Topics</Link>
          <div onClick={e => this.showName(e)}>{this.props.name}</div>
        </div>
      </div>
    );
  }
}

export default connect()(Home);
