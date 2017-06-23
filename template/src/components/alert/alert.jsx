import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './alert.scss';
import { insertComponent, removeComponentByRef } from '../../common/common';
import Btn from '../btn/btn';

const idStr = 'alertBox';

const defineClose = ({ elNode, id } = {}) => {
    let el = '';
    if (elNode) {
        el = elNode;
    } else if (id) {
        el = document.getElementById(id);
    }
    removeComponentByRef(el);
};

class AlertWrap extends Component {
    static propTypes = {
        title: PropTypes.any,
        children: PropTypes.any,
        style: PropTypes.object,
        onCloseCallback: PropTypes.func,
        onConfirm: PropTypes.func,
    };

    state = {
        isClose: true,
    }

    componentDidMount() {
        this.overlay.addEventListener('click', this.close);
    }

    componentWillUnmount() {
        this.overlay.removeEventListener('click', this.close);
    }

    onConfirm = (e) => {
        if (this.props.onConfirm) this.props.onConfirm();
        this.close(e);
    };

    close = (e) => {
        e.preventDefault();

        if (this.props.onCloseCallback) this.props.onCloseCallback();
        defineClose({ elNode: this.box });
    };

    renderTitle = () => {
        if (this.props.title) {
            return (
                <div className={css.title}>
                    {this.props.title}
                    <input type="button" className={css.close} onClick={(e) => this.close(e)} />
                </div>
            );
        }
        return null;
    };
    renderBtn = () => {
        if (this.props.onConfirm) {
            return (<div className={css.buttons}>
                <button><Btn content="确定" onClickCallBack={this.onConfirm} /></button>
            </div>);
        }
        return null;
    };

    render() {
        return (
            <div ref={(ref) => { this.box = ref; }} id={idStr}>
                <div className={css.overlay} ref={(ref) => { this.overlay = ref; }} />
                <div
                    className={`${this.props.title ? css['dialog-title'] : css.dialog}`}
                    style={this.props.style}
                >
                    {this.renderTitle()}
                    <div className={css.content}>
                        <div className={css.cell}>{this.props.children}</div>
                    </div>
                    {this.renderBtn()}
                </div>
            </div>
        );
    }
}

export default class Alert extends AlertWrap {
    static show = ({ content, title = undefined, onConfirm = undefined, style = undefined, onCloseCallback }) => {
        insertComponent(
            <AlertWrap
                title={title}
                onConfirm={onConfirm}
                style={style}
                onCloseCallback={onCloseCallback}
            >{content}</AlertWrap>
        );
    };

    static close = () => {
        const oldAlertBox = document.getElementById(idStr);
        if (oldAlertBox) defineClose({ elNode: oldAlertBox });
    }
}
