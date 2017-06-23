import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../../../components/pagination/index';
import Table from '../../../components/table/index';
import Css from './patination.scss';

class ShowPagination extends Component {
  static propTypes = {
      perPage: PropTypes.number
  }

  constructor(props) {
      super(props);

      this.state = {
          offset: Number(this.props.match.params.id),
          pageCount: 100,
          data: []
      };
      this.perPage = 10;
      this.offset = this.state.offset;
      this.data = [];
      this.columns = [
          { title: 'title1', dataIndex: 'a', key: 'a', width: 100 },
          { title: 'title2', dataIndex: 'b', key: 'b', width: 100 },
          { title: 'title3', dataIndex: 'c', key: 'c', width: 200 },
          { title: 'title4', dataIndex: 'd', key: 'd', width: 300 },
      ];
  }

  componentWillMount() {
    this.loadCommentsFromServer();
  }
  loadCommentsFromServer() {
    const num = this.props.match.params.id;
    const interval = this.perPage;
    const data = [];
    for (let i = 0; i < interval; i += 1) {
      const da = {};
      da.a = `tab1_${(num * interval) + i}`;
      da.b = `tab2_${(num * interval) + i}`;
      da.c = `tab3_${(num * interval) + i}`;
      da.d = `tab_4${(num * interval) + i}`;
      data.push(da);
    }
    this.setState({ data: data });
  }
  handlePageClick = (data) => {
    const selected = data.selected;
    const offset = Math.ceil(selected * this.perPage);
    if (offset === this.state.offset) {
        return;
    }
    this.setState({ offset: offset }, () => {
      this.loadCommentsFromServer();
    });
  };
  jumpToPage = index => {
      if (index > 0) {
          return `/patination/${index}`;
      }
      return '';
  }

  render() {
    return (
      <div className="commentBox">
        <Table columns={this.columns} data={this.state.data} />
        <Pagination
           previousLabel={'上一页'}
           nextLabel={'下一页'}
           breakLabel={<a href="">...</a>}
           hrefBuilder={this.jumpToPage}
           breakClassName={'break-me'}
           pageCount={this.state.pageCount}
           marginPagesDisplayed={2}
           pageRangeDisplayed={5}
           containerClassName={Css.patination}
           subContainerClassName={'pages pagination'}
           activeClassName={Css.active}
           currentPage={this.state.offset}
        />
      </div>
    );
  }
}

export default ShowPagination;
