/* eslint-disable no-trailing-spaces */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from './home.css';
import Alert from '../../../components/alert/alert';
import getUserInfo from '../../../service/user/user-api';
// import Loading from '../../components/loading/loading';
import ImgLoading from '../../../components/loading/imgLoading';
import FilesLoading from '../../../components/filesLoading/filesLoading';

const files = [{
    src: 'https://www.9fstock.com/images/banner.png',
    type: 'img'
}, { src: 'https://www.9fstock.com/images/download_banner.png', type: 'img' }, {
    src: 'https://www.9fstock.com/images/help_banner.png',
    type: 'img'
}, { src: 'https://www.9fstock.com/images/about_banner01.png', type: 'img' }, {
    src: 'https://www.9fstock.com/images/about_banner02.png',
    type: 'img'
}, {
    src: 'http://www.w3school.com.cn/i/movie.ogg',
    type: 'video'
}, {
    src: 'https://www.9fstock.com/images/index_bz05.png',
    type: 'img'
}, {
    src: 'https://www.9fstock.com/images/index_icon08.png',
    type: 'img'
}, {
    src: 'https://www.9fstock.com/images/index_icon09.png',
    type: 'img'
}, {
    src: 'https://www.9fstock.com/images/index_icon10.png',
    type: 'img'
}, {
    src: 'https://www.9fstock.com/images/index_icon11.png',
    type: 'img'
}, {
    src: 'https://www.9fstock.com/images/quanqiu.png',
    type: 'img'
}
];
class Home extends Component {
    static propTypes = {
        name: PropTypes.string,
    };
    static defaultProps = {
        name: '弹窗',
    };


    componentWillMount() {
        getUserInfo.getUserInfo({
            version: '2.0',
            params: {
                sessionId: 'df77add9bc8a4ea49f1b8511c3e8d36b811',
                userId: 10045,
                flag: 15
            }
        });
    }
    componentDidMount() {
        FilesLoading.show({
            files: files,
            useDefault: true,
            callBack: this.testss
            // progressColor: '#000',
        });
    }
    componentWillUnmount() {
    }
    testss = (t) => {
        console.log(t);
    }
    test = () => {
        return (<img src="https://www.9fstock.com/images/index_icon08.png" alt="tst" />);
    }
    showAgreement = () => () => {
        // Loading.show({ needStopBtn: false });
        Alert.show({
            title: 'tiale',
            content: this.test(),
            style: {
                width: '80%',
                marginLeft: '-40%',
                top: '20%',
                height: '60%',
            },
            onConfirm: () => { },
        });
    };

    render() {
        return (
            <div className={css.home}>
                <div className={css['home-div']}>
                    <button onClick={this.showAgreement()}>{this.props.name}</button>
                </div>
                <ImgLoading imageUrl="https://www.9fstock.com/images/index_icon08.png" />
            </div>
        );
    }
}

export default Home;
