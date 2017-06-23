/* eslint-disable no-console,func-names,react/no-multi-comp */
import React, { Component } from 'react';
import Table from '../../../components/table/index';

class TableShow extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            { title: 'title1', dataIndex: 'a', key: 'a', width: 100 },
            { title: 'title2', id: '123', dataIndex: 'b', key: 'b', width: 100 },
            { title: 'title3', dataIndex: 'c', key: 'c', width: 200 },
            {
                title: 'Operations',
                dataIndex: '',
                key: 'd',
                render: (text, record) =>
                <a onClick={e => this.onDelete(record.key, e)} >Delete</a>,
            },
        ];
        this.state = {
            data: [
                { a: '123', b: 'aa', c: 'eee', key: '1' },
                { a: 'cdd', b: 'edd', c: 'eee', key: '2' },
                { a: '1333', b: 'edd', c: 'eee', key: '3' },
            ],
        };
    }

    onDelete(key, e) {
        console.log('Delete', key);
        e.preventDefault();
        const data = this.state.data.filter(item => item.key !== key);
        this.setState({ data });
    }

    onAdd() {
        const data = [...this.state.data];
        data.push({
            a: 'new data',
            b: 'new data',
            c: 'new data',
            key: Date.now(),
        });
        this.setState({ data });
    }

    onSelected = (date) => {
        this.setState({ date: date });
    }

    render() {
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                rowSpan: 4
            },
            {
                title: '其它',
                children: [
                    {
                        title: '年龄',
                        dataIndex: 'age',
                        key: 'age',
                        rowSpan: 3
                    },
                    {
                        title: '住址',
                        children: [
                            {
                                title: '街道',
                                dataIndex: 'street',
                                key: 'street',
                                rowSpan: 2
                            },
                            {
                                title: '小区',
                                children: [
                                    {
                                        title: '单元',
                                        dataIndex: 'building',
                                        key: 'building',
                                    },
                                    {
                                        title: '门牌',
                                        dataIndex: 'number',
                                        key: 'number',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                title: '公司',
                children: [
                    {
                        title: '地址',
                        dataIndex: 'companyAddress',
                        key: 'companyAddress',
                        rowSpan: 3
                    },
                    {
                        title: '名称',
                        dataIndex: 'companyName',
                        key: 'companyName',
                        rowSpan: 3
                    },
                ],
            },
            {
                title: '性别',
                dataIndex: 'gender',
                key: 'gender',
                rowSpan: 4
            },
        ];


        const data = [{
            key: '1',
            name: '胡彦斌',
            age: 32,
            street: '拱墅区和睦街道',
            building: 1,
            number: 2033,
            companyAddress: '西湖区湖底公园',
            companyName: '湖底有限公司',
            gender: '男',
        }, {
            key: '2',
            name: '胡彦祖',
            age: 42,
            street: '拱墅区和睦街道',
            building: 3,
            number: 2035,
            companyAddress: '西湖区湖底公园',
            companyName: '湖底有限公司',
            gender: '男',
        }];

        return (
            <div>
                <button onClick={() => this.onAdd()}>添加</button>
                <Table columns={this.columns} data={this.state.data} />
                <Table columns={columns} data={data} className="bordered" />
            </div>
        );
    }
}

export default TableShow;
