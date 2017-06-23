/* eslint-disable no-trailing-spaces */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './loading.scss';
import { insertComponent, eventListener } from '../../common/common';
import LoadingIconSvg from './loading_icon_svg';

const btnMargin = 30;
const idStr = 'loading';
const defineClose = ({ elNode, id } = {}) => {
    let el = '';
    if (elNode) { el = elNode; } else if (id) { el = document.getElementById(id); }
    // removeComponentByRef(el);
    el.style.display = 'none';
};

class LoadingWrap extends Component {
    static propTypes = {
        visit: PropTypes.bool,
        needLoadingText: PropTypes.bool,
        loadingText: PropTypes.string,
        loadingColor: PropTypes.string,
        waitingText: PropTypes.string,
        waitingColor: PropTypes.string,
        confirmText: PropTypes.string,
        confirmColor: PropTypes.string,
        needStopBtn: PropTypes.bool,
        needStopWaitTime: PropTypes.bool,
        needStopConfirm: PropTypes.bool,
        stopWaitTime: PropTypes.number,
        stopCallBack: PropTypes.func,
        overtime: PropTypes.number, // 加载时长，传小于0表示不自动中止
        parentRef: PropTypes.any,
        bgColor: PropTypes.string,
        shadowColor: PropTypes.string,
    };

    static defaultProps = {
        visit: true,
        overtime: 0, // 默认加载时长5s
        needLoadingText: true,
        needStopBtn: true,
        needStopConfirm: true,
        needStopWaitTime: false,
        stopBufferTime: 3000,
        loadingText: '加载中...',
        waitingText: '正在取消...',
        confirmText: '确定取消？',
        loadingColor: '#ffffff',
        waitingColor: 'orange',
        confirmColor: '#ffffff',
        bgColor: '#606060',
        shadowColor: '#606060',
    };

    constructor(props) {
        super(props);
        this.state = {
            status: 'loading',
        };

        this.renderInfo = {
            loading: {
                txt: props.loadingText,
                icon: <b><LoadingIconSvg color={props.loadingColor} /></b>,
                btnRender: 'renderBtn',
                color: props.loadingColor,
            },
            waiting: {
                txt: props.waitingText,
                icon: <b><LoadingIconSvg color={props.waitingColor} /></b>,
                btnRender: 'renderBtn',
                color: props.waitingColor,
            },
            confirm: {
                txt: props.confirmText,
                icon: '',
                btnRender: 'renderBtn',
                color: props.confirmColor,
            },
        };
    }

    componentDidMount() {
        setTimeout(() => this.layout(), 0);

        if (this.props.overtime > 0) {
            this.timer = setTimeout(() => {
                this.stopFunc();
            }, this.props.overtime);
        }
        if (this.props.needStopBtn) eventListener(this.loading, ['touchstart', this.onTouchStop]);
    }

    componentWillUnmount() {
        eventListener(this.loading, ['touchstart', this.onTouchStop], 'remove');
        clearTimeout(this.timer);
        this.timer = null;
    }

    // waitingIcon = () => (
    //   <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    //     <circle
    //       r="100%"
    //       cy="50%" cx="50%"
    //       strokeWidth="5"
    //       stroke={this.props.loadingColor}
    //       fill="none"
    //     />
    //     <circle
    //       r="100%"
    //       cy="50%" cx="50%"
    //       strokeWidth="5"
    //       stroke={this.props.waitingColor}
    //       strokeDasharray={[
    //         circumference * avgRate,
    //         circumference * (1 - avgRate),
    //       ]}
    //       strokeDashoffset={circumference * (0.25 + avgRate)}
    //       strokeLinecap="round"
    //       fill="none"
    //     >
    //     </circle>
    //   </svg>
    // );

    onTouchStop = () => {
        if (this.state.status === 'loading') {
            if (this.props.needStopWaitTime) {
                this.setState({ status: 'waiting' });
            } else if (this.props.needStopConfirm) {
                this.setState({ status: 'confirm' });
            } else {
                this.stopFunc();
            }
        } else if (this.state.status === 'waiting') {
            console.log('waiting');
        } else {
            this.stopFunc();
        }
    };

    stopFunc = () => {
        if (this.props.stopCallBack) this.props.stopCallBack();
        this.closeFunc();
    };

    closeFunc() {
        defineClose({ elNode: this.loadingBox });
    }

    layout() {
        // let rect;
        // if (this.props.parentRef === undefined) {
        //   const e = document.documentElement;
        //   rect = { left: 0, top: 0, width: e.clientWidth, height: e.clientHeight };
        // } else {
        //   rect = this.props.parentRef.getBoundingClientRect();
        // }
        const rect = this.loadingBox.getBoundingClientRect();
        const r = this.loading.getBoundingClientRect();
        const left = ((rect.width - r.width) / 2);
        const top = ((rect.height - r.height) / 2);
        const style = `top: ${top}px; left:${left}px;background-color: ${this.props.bgColor};`;
        this.loading.setAttribute('style', style);
    }

    renderBtn = () => {
        const { color } = this.renderInfo[this.state.status];
        const d = this.state.status === 'confirm' ?
            (`M ${btnMargin},50 L 50,${100 - btnMargin} L ${100 - btnMargin},${btnMargin}`) :
            (
                `M ${btnMargin},${btnMargin}
        L ${100 - btnMargin},${100 - btnMargin}
        M ${100 - btnMargin},${btnMargin}
        L ${btnMargin},${100 - btnMargin}`);
        return (
            <svg width="100%" height="100%" viewBox="0 0 100 100">
                <path
                    className={css['btn-line']}
                    stroke={color}
                    d={d}
                />
            </svg>
        );
    };

    render() {
        const { status } = this.state;
        const style = this.props.visit ? null : { display: 'none' };

        return (
            <div
                className={css['loading-box']}
                style={style}
                ref={(ref) => { this.loadingBox = ref; }}
                id={idStr}
            >
                <div className={css.overlay} style={{ backgroundColor: this.props.shadowColor }} />
                <div
                    ref={(ref) => { this.loading = ref; }}
                    className={css['loading-wrap']}
                >
                    <div className={css.loading} style={{ color: this.renderInfo[status].color }}>
                        {this.renderInfo[status].icon}
                        {
                            this.props.needLoadingText ? <span>
                                                                {this.renderInfo[status].txt}
                                                              </span> : null
                        }
                    </div>
                    {
                        this.props.needStopBtn ?
                            (<span className={css['stop-btn']}>
                {this[this.renderInfo[status].btnRender]()}
              </span>) : ''
                    }
                </div>
            </div>
        );
    }
}

export default class Loading extends LoadingWrap {
    static show(param, ref = document.documentElement) {
        // const oldLoading = this.ref.querySelector[idStr];
        const oldLoading = document.getElementById(idStr);
        // if (oldLoading) removeComponentByRef(oldLoading);
        if (!oldLoading) {
            if (typeof param === 'object') {
                insertComponent(<LoadingWrap {...param} parentRef={ref} />);
            } else if (typeof param === 'string') {
                insertComponent(<LoadingWrap loadingText={param} parentRef={ref} />);
            } else {
                insertComponent(<LoadingWrap parentRef={ref} />);
            }
        } else {
            oldLoading.style.display = 'block';
        }
    }

    static close() {
        setTimeout(() => {
            const oldLoading = document.getElementById(idStr);
            if (oldLoading) defineClose({ elNode: oldLoading });
        }, 300);
    }
}
