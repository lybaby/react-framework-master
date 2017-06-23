/* eslint-disable no-trailing-spaces */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './click-btn-wrap.scss';
import { eventListener } from '../../common/common';


class ClickBtnWrap extends Component {
    static propTypes = {
        children: PropTypes.any,
        onClickOverFunc: PropTypes.func,
        onClickOutFunc: PropTypes.func,
        onClickFunc: PropTypes.func,
        bgColorDefault: PropTypes.string,
        bgColorFocus: PropTypes.string,
        needBgAnimate: PropTypes.bool,
    };

    static defaultProps = {
        needBgAnimate: false,
        bgColorDefault: 'transparent',
        bgColorFocus: 'transparent',
    };

    constructor(props) {
        super(props);
        this.state = {
            bgColor: props.bgColorDefault,
        };
        this.boxEvent = [
            ['mouseover', this.onClickOverFunc],
            ['mouseout', this.onClickOutFunc],
            // ['click', this.onClickFunc],
        ];
    }

    componentDidMount() {
        eventListener(this.box, this.boxEvent);
    }

    componentWillUnmount() {
        eventListener(this.box, this.boxEvent, 'remove');
    }

    onClickOverFunc = (e) => {
        const nowTime = new Date().getTime();
        if (!this.touchTime || (nowTime - this.touchTime >= 300)) {
            this.touchTime = nowTime;
            eventListener(this.box, ['click', this.onClickFunc]);
            if (this.props.onClickOverFunc) this.props.onClickOverFunc(e);
            this.setState({ bgColor: this.props.bgColorFocus });
        }
    };

    onClickOutFunc = (e) => {
        // this.eventPreventDefault(e);

        this.setState({ bgColor: this.props.bgColorDefault });
        if (this.props.onClickOutFunc) this.props.onClickOutFunc(e);
        eventListener(this.box, ['click', this.onClickFunc], 'remove');
    };

    onClickFunc = (e) => {
        const el = e.currentTarget;
        const inputList = document.getElementsByTagName('input');
        for (let i = 0; i < inputList.length; i++) {
            inputList[i].blur();
        }
        this.eventPreventDefault(e);
        this.setState({ bgColor: this.props.bgColorDefault });
        if (this.props.onClickFunc) this.props.onClickFunc(e);
        eventListener(el, ['click', this.onClickFunc], 'remove');
    };

    eventPreventDefault = (e) => {
        // 判断默认行为是否可以被禁用
        if (e.cancelable) {
            // 判断默认行为是否已经被禁用
            if (!e.defaultPrevented) {
                e.preventDefault();
            }
        }
    };

    transitionStyle = () => {
        if (!this.props.needBgAnimate) return {};
        return { transition: 'background-color 250ms' };
    };

    render() {
        return (
            <div
                ref={(ref) => { this.box = ref; }}
                className={css['touch-tap-wrap']}
            >
                <div
                    style={{
            backgroundColor: this.state.bgColor,
            ...this.transitionStyle(),
          }}
                >
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default ClickBtnWrap;
