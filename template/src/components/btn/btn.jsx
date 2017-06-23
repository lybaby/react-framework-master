/* eslint-disable no-trailing-spaces */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './btn.scss';
import ClickBtnWrap from '../click_btn_wrap/click-btn-wrap';


class Btn extends Component {
    static propTypes = {
        content: PropTypes.any,
        disable: PropTypes.bool,
        disableBgColor: PropTypes.string,
        activeBgColor: PropTypes.string,
        focusBgColor: PropTypes.string,
        disableBtnTips: PropTypes.string,
        onClickCallBack: PropTypes.func,
    };
    static defaultProps = {
        content: '提交',
        disable: false,
        disableBgColor: '#ca2c33',
        activeBgColor: '#eb333b',
        focusBgColor: '#ca2c33',
        disableBtnTips: '请完成所有项目选择/填写',
        onClickCallBack: () => {},
    };

    componentWillMount() {

    }
    componentWillUnmount() {
    }

    render() {
        const { content, disable, disableBgColor, activeBgColor, focusBgColor, onClickCallBack } = this.props;
        return (
            <div className={css.btn}>
                {
                    disable ?
                        <div
                            onClick={this.onClickCallBack}
                            style={{ backgroundColor: disableBgColor }}
                        >{content}</div> :
                        <ClickBtnWrap
                            bgColorDefault={activeBgColor}
                            bgColorFocus={focusBgColor}
                            onClickFunc={onClickCallBack}
                        >{content}
                        </ClickBtnWrap>
                }
            </div>

        );
    }
}

export default Btn;
