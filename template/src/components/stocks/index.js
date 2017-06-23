import React, { Component } from 'react';
import PropTypes from 'prop-types';

const echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
require('echarts/lib/chart/candlestick');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/markLine');
require('echarts/lib/component/dataZoom');
require('echarts/lib/component/axisPointer');
require('echarts/lib/component/markPoint');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('echarts/lib/component/dataZoom');

require('echarts/lib/component/markLine');
require('echarts/lib/component/markArea');

require('echarts/lib/component/toolbox');


export default class Stocks extends Component {
    static propTypes = {
        data: PropTypes.array,
        className: PropTypes.string,
        stockTypes: PropTypes.number
    };

    static defaultProps = {

    };

    constructor(props) {
        super(props);
        this.state = {};
        this.newData = [
                        2320.26, 2320.26, 2287.3, 2362.94, 2295.35, 2346.5, 2295.35, 2346.92,
                        2383.43, 2385.42, 2371.23, 2391.82, 2425.92, 2428.15, 2417.58, 2440.38,
                        2411, 2433.13, 2403.3, 2437.42, 2416.62, 2432.4, 2414.4, 2443.03,
                        2420.26, 2382.91, 2373.53, 2427.07, 2378.82, 2325.95, 2309.17, 2378.82,
                        2322.94, 2314.16, 2308.76, 2330.88, 2320.62, 2325.82, 2315.01, 2338.78,
                        2255.77, 2270.28, 2253.31, 2276.22, 2267.29, 2240.02, 2239.21, 2276.05,
                        2244.26, 2257.43, 2232.02, 2261.31, 2257.74, 2317.37, 2257.42, 2317.86,
                        2318.21, 2324.24, 2311.6, 2330.81, 2318.58, 2297.67, 2281.12, 2319.99,
                        2238.49, 2236.62, 2228.81, 2246.87, 2229.46, 2234.4, 2227.31, 2243.95,
                        2320.26, 2320.26, 2287.3, 2362.94, 2295.35, 2346.5, 2295.35, 2346.92,
                        2383.43, 2385.42, 2371.23, 2391.82, 2425.92, 2428.15, 2417.58, 2440.38,
                        2411, 2433.13, 2403.3, 2437.42, 2416.62, 2432.4, 2414.4, 2443.03,
                        2420.26, 2382.91, 2373.53, 2427.07, 2378.82, 2325.95, 2309.17, 2378.82,
                        2322.94, 2314.16, 2308.76, 2330.88, 2320.62, 2325.82, 2315.01, 2338.78,
                        2255.77, 2270.28, 2253.31, 2276.22, 2267.29, 2240.02, 2239.21, 2276.05,
                        2244.26, 2257.43, 2232.02, 2261.31, 2257.74, 2317.37, 2257.42, 2317.86,
                        2318.21, 2324.24, 2311.6, 2330.81, 2318.58, 2297.67, 2281.12, 2319.99,
                        2238.49, 2236.62, 2228.81, 2246.87, 2229.46, 2234.4, 2227.31, 2243.95,
                        2320.26, 2320.26, 2287.3, 2362.94, 2295.35, 2346.5, 2295.35, 2346.92,
                        2383.43, 2385.42, 2371.23, 2391.82, 2425.92, 2428.15, 2417.58, 2440.38,
                        2411, 2433.13, 2403.3, 2437.42, 2416.62, 2432.4, 2414.4, 2443.03,
                        2420.26, 2382.91, 2373.53, 2427.07, 2378.82, 2325.95, 2309.17, 2378.82,
                        2322.94, 2314.16, 2308.76, 2330.88, 2320.62, 2325.82, 2315.01, 2338.78,
                        2255.77, 2270.28, 2253.31, 2276.22, 2267.29, 2240.02, 2239.21, 2276.05,
                        2244.26, 2257.43, 2232.02, 2261.31, 2257.74, 2317.37, 2257.42, 2317.86,
                        2318.21, 2324.24, 2311.6, 2330.81, 2318.58, 2297.67, 2281.12, 2319.99,
                        2238.49, 2236.62, 2228.81, 2246.87, 2229.46, 2234.4, 2227.31, 2243.95,
                        2320.26, 2320.26, 2287.3, 2362.94, 2295.35, 2346.5, 2295.35, 2346.92,
                        2383.43, 2385.42, 2371.23, 2391.82, 2425.92, 2428.15, 2417.58, 2440.38,
                        2411, 2433.13, 2403.3, 2437.42, 2416.62, 2432.4, 2414.4, 2443.03,
                        2420.26, 2382.91, 2373.53, 2427.07, 2378.82, 2325.95, 2309.17, 2378.82,
                        2322.94, 2314.16, 2308.76, 2330.88, 2320.62, 2325.82, 2315.01, 2338.78,
                        2255.77, 2270.28, 2253.31, 2276.22, 2267.29, 2240.02, 2239.21, 2276.05,
                        2244.26, 2257.43, 2232.02, 2261.31, 2257.74, 2317.37, 2257.42, 2317.86,
                        2318.21, 2324.24, 2311.6, 2330.81, 2318.58, 2297.67, 2281.12, 2319.99,
                        2238.49, 2236.62, 2228.81, 2246.87, 2229.46, 2234.4, 2227.31, 2243.95,
                    ];
        this.xData = [
            '09:30', '09:31', '09:32', '09:33', '09:34', '09:35', '09:36', '09:37', '09:38', '09:39',
            '09:40', '09:41', '09:42', '09:43', '09:44', '09:45', '09:46', '09:47', '09:48', '09:49',
            '10:00', '10:01', '10:02', '10:03', '10:04', '10:05', '10:06', '10:07', '10:08', '10:09',
            '10:10', '10:11', '10:12', '10:13', '10:14', '10:15', '10:16', '10:17', '10:18', '10:19',
            '10:20', '10:21', '10:22', '10:23', '10:24', '10:25', '10:26', '10:27', '10:28', '10:29',
            '10:30', '10:31', '10:32', '10:33', '10:34', '10:35', '10:36', '10:37', '10:38', '10:39',
            '10:40', '10:41', '10:42', '10:43', '10:44', '10:45', '10:46', '10:47', '10:48', '10:49',
            '10:50', '10:51', '10:52', '10:53', '10:54', '10:55', '10:56', '10:57', '10:58', '10:59',
            '11:00', '11:01', '11:02', '11:03', '11:04', '11:05', '11:06', '11:07', '11:08', '11:09',
            '11:10', '11:11', '11:12', '11:13', '11:14', '11:15', '11:16', '11:17', '11:18', '11:19',
            '11:20', '11:21', '11:22', '11:23', '11:24', '11:25', '11:26', '11:27', '11:28', '11:29', '11:30',
            '13:00', '13:01', '13:02', '13:03', '13:04', '13:05', '13:06', '13:07', '13:08', '13:09',
            '13:10', '13:11', '13:12', '13:13', '13:14', '13:15', '13:16', '13:17', '13:18', '13:19',
            '13:20', '13:21', '13:22', '13:23', '13:24', '13:25', '13:26', '13:27', '13:28', '13:29',
            '13:30', '13:31', '13:32', '13:33', '13:34', '13:35', '13:36', '13:37', '13:38', '13:39',
            '13:40', '13:41', '13:42', '13:43', '13:44', '13:45', '13:46', '13:47', '13:48', '13:49',
            '13:50', '13:51', '13:52', '13:53', '13:54', '13:55', '13:56', '13:57', '13:58', '13:59',
            '14:00', '14:01', '14:02', '14:03', '14:04', '14:05', '14:06', '14:07', '14:08', '14:09',
            '14:10', '14:11', '14:12', '14:13', '14:14', '14:15', '14:16', '14:17', '14:18', '14:19',
            '14:20', '14:21', '14:22', '14:23', '14:24', '14:25', '14:26', '14:27', '14:28', '14:29',
            '14:30', '14:31', '14:32', '14:33', '14:34', '14:35', '14:36', '14:37', '14:38', '14:39',
            '14:40', '14:41', '14:42', '14:43', '14:44', '14:45', '14:46', '14:47', '14:48', '14:49',
            '14:50', '14:51', '14:52', '14:53', '14:54', '14:55', '14:56', '14:57', '14:58', '14:59',
            '15:00'
        ];
        this.optionMinute = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '12%',
                top: '5%',
                right: '12%',
                bottom: '8%',
                borderWidth: 2,
                borderColor: '#413b77'
            },
            xAxis: {
                boundaryGap: false,
                type: 'category',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#413b77',
                        width: 1,
                        type: 'solid'
                    },
                    interval: function (index, value) {
                        if (value === '09:15'
                            || value === '09:30'
                            || value === '10:30'
                            || value === '11:30'
                            || value === '14:00'
                            || value === '15:00') {
                            return true;
                        }
                        return false;
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#413b77',
                        width: 2,
                        type: 'solid'
                    }
                },
                axisTick: {
                    show: false
                },
                data: this.xData,
                scale: true,
                axisLabel: {
                    show: true,
                    interval: 0,
                    textStyle: {
                        color: '#9a95d2',
                        fontSize: 8
                    },
                    formatter: function (value) {
                        if (value === '09:15'
                            || value === '09:30'
                            || value === '10:30'
                            || value === '14:00'
                            || value === '15:00') {
                            return value;
                        } else if (value === '11:30') {
                            return '11:30/13:00';
                        }
                        return '';
                    }
                },
            },
            yAxis: {
                type: 'value',
                axisTick: {
                    show: false
                },
                scale: true,
                axisLine: {
                    lineStyle: {
                        color: '#413b77',
                        width: 1,
                        type: 'solid'
                    }
                },
                splitNumber: 3,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#413b77',
                        width: 1,
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    color: '#9a95d2',
                    textStyle: {
                        color: '#9a95d2',
                        fontSize: 8
                    },
                    formatter: function (value) {
                        return value.toFixed(0);
                    },
                }
            },
            series: {
                name: '当前指数',
                type: 'line',
                symbol: 'none',
                markLine: {
                    smooth: true,
                    symbol: ['none'],
                    data: [
                        { xAxis: '09:30', yAxis: '2411' },
                        { xAxis: '15:00', yAxis: '2411' },
                    ],
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    lineStyle: {
                        normal: {
                            type: 'solid',
                            color: '#413b77',
                            width: 1,
                            fontSize: 10
                        }
                    }
                },
                lineStyle: {
                    normal: {
                        color: '#6fa5b3',
                        width: 2
                    }
                },
                data: []
            }
        };
        this.optionKLine = {
            title: {
                text: '上证指数',
                left: 0
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '15%'
            },
            xAxis: {
                type: 'category',
                data: [],
                scale: true,
                boundaryGap: false,
                axisLine: { onZero: false },
                splitLine: { show: false },
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax'
            },
            yAxis: {
                scale: true,
                splitArea: {
                    show: true
                }
            },
            dataZoom: [
                {
                    type: 'inside',
                    start: 50,
                    end: 100
                },
                {
                    show: true,
                    type: 'slider',
                    y: '90%',
                    start: 50,
                    end: 100
                }
            ],
            series: [
                {
                    name: '日K',
                    type: 'candlestick',
                    data: [],
                    markPoint: {
                        label: {
                            normal: {
                                formatter: function (param) {
                                    return param != null ? Math.round(param.value) : '';
                                }
                            }
                        },
                        data: [
                            {
                                name: 'XX标点',
                                coord: ['2013/5/31', 2300],
                                value: 2300,
                                itemStyle: {
                                    normal: { color: 'rgb(41,60,85)' }
                                }
                            },
                            {
                                name: 'highest value',
                                type: 'max',
                                valueDim: 'highest'
                            },
                            {
                                name: 'lowest value',
                                type: 'min',
                                valueDim: 'lowest'
                            },
                            {
                                name: 'average value on close',
                                type: 'average',
                                valueDim: 'close'
                            }
                        ],
                        tooltip: {
                            formatter: function (param) {
                                return `${param.name}<br>${(param.data.coord || '')}`;
                            }
                        }
                    },
                    markLine: {
                        symbol: ['none', 'none'],
                        data: [
                            [
                                {
                                    name: 'from lowest to highest',
                                    type: 'min',
                                    valueDim: 'lowest',
                                    symbol: 'circle',
                                    symbolSize: 10,
                                    label: {
                                        normal: { show: false },
                                        emphasis: { show: false }
                                    }
                                },
                                {
                                    type: 'max',
                                    valueDim: 'highest',
                                    symbol: 'circle',
                                    symbolSize: 10,
                                    label: {
                                        normal: { show: false },
                                        emphasis: { show: false }
                                    }
                                }
                            ],
                            {
                                name: 'min line on close',
                                type: 'min',
                                valueDim: 'close'
                            },
                            {
                                name: 'max line on close',
                                type: 'max',
                                valueDim: 'close'
                            }
                        ]
                    }
                },
                {
                    name: 'MA5',
                    type: 'line',
                    data: [],
                    smooth: true,
                    lineStyle: {
                        normal: { opacity: 0.5 }
                    }
                },
                {
                    name: 'MA10',
                    type: 'line',
                    data: [],
                    smooth: true,
                    lineStyle: {
                        normal: { opacity: 0.5 }
                    }
                },
                {
                    name: 'MA20',
                    type: 'line',
                    data: [],
                    smooth: true,
                    lineStyle: {
                        normal: { opacity: 0.5 }
                    }
                },
                {
                    name: 'MA30',
                    type: 'line',
                    data: [],
                    smooth: true,
                    lineStyle: {
                        normal: { opacity: 0.5 }
                    }
                },

            ]
        };
        this.curTypes = 0;
        this.myChart = null;
    }


    componentDidMount() {
        this.myChart = echarts.init(this.refs.stockChart);
        this.initStocks();
    }

    componentDidUpdate() {
        this.initStocks();
    }

    initStocks() {
        const { data, stockTypes } = this.props;
        if (stockTypes === 0) {
            this.optionMinute.series.data = data;
            this.optionMinute.series.markLine.data[0].yAxis = data[0];
            this.optionMinute.series.markLine.data[1].yAxis = data[0];
            if (this.curTypes === stockTypes) {
                this.myChart.setOption(this.optionMinute);
            } else {
                this.myChart.setOption(this.optionMinute, true);
            }
        } else {
            const newData = this.splitData(data);
            this.optionKLine.xAxis.data = newData.categoryData;
            this.optionKLine.series[0].data = newData.values;
            this.optionKLine.series[1].data = this.calculateMA(newData, 5);
            this.optionKLine.series[2].data = this.calculateMA(newData, 10);
            this.optionKLine.series[3].data = this.calculateMA(newData, 20);
            this.optionKLine.series[4].data = this.calculateMA(newData, 30);
            if (this.curTypes === stockTypes) {
                this.myChart.setOption(this.optionKLine);
            } else {
                this.myChart.setOption(this.optionKLine, true);
            }
        }
        this.curTypes = stockTypes;
    }

    splitData = (rawData) => {
        const categoryData = [];
        const values = [];
        const rawDatas = rawData;
        for (let i = 0; i < rawDatas.length; i += 1) {
            categoryData.push(rawDatas[i][0]);
            values.push(rawDatas[i].slice(1));
        }
        return {
            categoryData: categoryData,
            values: values
        };
    }

    calculateMA = (data, dayCount) => {
        const result = [];
        for (let i = 0, len = data.values.length; i < len; i += 1) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            let sum = 0;
            for (let j = 0; j < dayCount; j += 1) {
                sum += data.values[i - j][1];
            }
            result.push(sum / dayCount);
        }
        return result;
    }

    render() {
        return (
            <div>
                <div className={this.props.className} ref="stockChart" style={{ width: '100%', height: '600px', margin: '0 3%', padding: '20px' }}></div>
            </div>
        );
    }
}
