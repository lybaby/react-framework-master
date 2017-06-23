/* eslint-disable no-trailing-spaces */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './filesLoading.scss';
import { insertComponent, removeComponentByRef } from '../../common/common';

const TYPES = ['img', 'audio', 'video'];
const idStr = 'filesLoading';
const defineClose = ({ elNode, id } = {}) => {
    let el = '';
    if (elNode) {
        el = elNode;
    } else if (id) {
        el = document.getElementById(id);
    }
     removeComponentByRef(el);
    // el.style.display = 'none';
};

class FilesLoadingWrap extends Component {
    static propTypes = {
        files: PropTypes.array, // 文件数组
        useDefault: PropTypes.bool, // 是否使用默认进度条
        progressColor: PropTypes.string, // 默认进度条颜色
        shadowColor: PropTypes.string, // 默认进度颜色
        callBack: PropTypes.func.isRequired, // 回调进度返回
        // progress: PropTypes.number,
        mostDowntime: PropTypes.number, // 一个文件的最长下载时间
    };

    static defaultProps = {
        files: {},
        useDefault: false,
        progressColor: '#fd30ae',
        shadowColor: '#606060',
        progress: 0,
        mostDowntime: 5000,
    };

    constructor(props) {
        super(props);
        this.state = {
            status: 'loading',
            count: 0
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.startLoading();
    }

    componentWillUnmount() {

    }

    // testChange = () => {
    //    const val = this.state.val + 1;
    //    this.props.callBack(val);
    // }

    startLoading = () => {
        for (let i = 0; i < this.props.files.length; i += 1) {
            this.loadfiles(this.props.files[i].src, this.props.files[i].type);
        }
    };


    loadImg = (src, callback) => {
        if (this.props.mostDowntime) {
            const st = setTimeout(() => {
                clearTimeout(st);
                callback();
                return false;
            }, this.props.mostDowntime);
        }
        const sprite = new Image();
        sprite.onload = callback;
        sprite.onerror = callback();
        sprite.src = src;
    }

    loadAudio = (src, callback) => {
        const audio = new Audio(src);
        audio.onloadedmetadata = callback;
        audio.src = src;
    }
    loadVideo = (src, callback) => {
        const video = document.createElement('VIDEO');
        video.onloadedmetadata = callback;
        video.src = src;
    }

    // loadJsAndCss = (src, callback) => {
    //    const xhr = new XMLHttpRequest();
    //    xhr.open('GET', src);
    //    xhr.send('');
    //    callback();
    // }

    loadfiles = (src, type) => {
        if (type === TYPES[0]) {
            this.loadImg(src, () => {
                this.progressChange();
            });
        } else if (type === TYPES[1]) {
            this.loadAudio(src, () => {
                this.progressChange();
            });
        } else if (type === TYPES[2]) {
            this.loadVideo(src, () => {
                this.progressChange();
            });
        }
        // else if (type === TYPES[2] || type === TYPES[3]) {
        //    this.loadJsAndCss(src, () => {
        //        this.setState({ count: this.state.count + 1 });
        //    });
        // }
        // console.log(this.state);
    }

    progressChange = () => {
        if ((this.state.count + 1) / this.props.files.length <= 1) {
            this.setState({ count: this.state.count + 1 });
            this.props.callBack(this.state.count / this.props.files.length);
        }
    }

    // 关闭进度条
    close = () => {
        setTimeout(() => {
            const oldLoading = document.getElementById(idStr);
            if (oldLoading) defineClose({ elNode: oldLoading });
        }, 300);
    }

    progressRender = () => {
        // 进度
        const progressNum = this.state.count / this.props.files.length;
        // 关闭进度
        if (progressNum === 1) {
            this.close();
        }
        // 半径
        const r = 50;
        // 计算当前的进度对应的角度值
        const degrees = progressNum * 360;
        // 计算当前角度对应的弧度值
        const rad = degrees * (Math.PI / 180);
        // 极坐标转换成直角坐标
        const x = (Math.sin(rad) * r).toFixed(2);
        const y = -(Math.cos(rad) * r).toFixed(2);
        // 大于180度时候画大角度弧，小于180度的画小角度弧，(deg > 180) ? 1 : 0
        const lenghty = window.Number(degrees > 180);
        // path 属性
        const descriptions = ['M', 0, -r, 'A', r, r, 0, lenghty, 1, x, y].join(' ');
        return (
            <div className={css['svg-block']}>
                <div className={css['progress-cicle-text']} style={{ color: this.props.progressColor }}>
                    {(progressNum * 100).toFixed(0)}%
                </div>
                <svg width="100px" height="100px" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path
                        id="ring"
                        fill="none"
                        stroke={this.props.progressColor}
                        style={{ strokeWidth: 2 }}
                        transform="translate(50,50)"
                        d={descriptions}
                    />
                </svg>
            </div>
        );
    }

    render() {
        const useDefault = this.props.useDefault;
        return (
            <div
                id={idStr}
                className={css['files-Loading']}
                style={useDefault === false ? { display: 'none' } : { display: 'block' }}
            >
                <div className={css.overlay} style={{ backgroundColor: this.props.shadowColor }} />
                <div
                    className={css['loading-wrap']}
                >
                    {this.progressRender()}
                </div>
            </div>
        );
    }
}


export default class FilesLoading extends FilesLoadingWrap {
    static show(param) {
        const oldLoading = document.getElementById(idStr);
        if (!oldLoading) {
            if (typeof param === 'object') {
                insertComponent(<FilesLoadingWrap {...param} />);
            } else {
                insertComponent(<FilesLoadingWrap />);
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
