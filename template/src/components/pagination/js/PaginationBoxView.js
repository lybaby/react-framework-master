import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import createFragment from 'react-addons-create-fragment';
import PageView from './PageView';
import BreakView from './BreakView';


export default class PaginationBoxView extends Component {
  static propTypes = {
    pageCount: PropTypes.number.isRequired,
    pageRangeDisplayed: PropTypes.number.isRequired,
    marginPagesDisplayed: PropTypes.number.isRequired,
    previousLabel: PropTypes.node,
    nextLabel: PropTypes.node,
    breakLabel: PropTypes.node,
    hrefBuilder: PropTypes.func,
    onPageChange: PropTypes.func,
    initialPage: PropTypes.number,
    forcePage: PropTypes.number,
    disableInitialCallback: PropTypes.bool,
    containerClassName: PropTypes.string,
    pageClassName: PropTypes.string,
    pageLinkClassName: PropTypes.string,
    activeClassName: PropTypes.string,
    previousClassName: PropTypes.string,
    nextClassName: PropTypes.string,
    previousLinkClassName: PropTypes.string,
    nextLinkClassName: PropTypes.string,
    disabledClassName: PropTypes.string,
    breakClassName: PropTypes.string,
    extraAriaContext: PropTypes.string,
    currentPage: PropTypes.number
  };

  static defaultProps = {
    pageCount: 10,
    pageRangeDisplayed: 2,
    marginPagesDisplayed: 3,
    activeClassName: 'selected',
    previousClassName: 'previous',
    nextClassName: 'next',
    previousLabel: 'Previous',
    nextLabel: 'Next',
    breakLabel: '...',
    disabledClassName: 'disabled',
    disableInitialCallback: false
  };

  constructor(props) {
    super(props);
    const selected = props.currentPage ? props.currentPage : 1;
    this.state = {
      selected: selected
    };
  }

  componentDidMount() {
    // Call the callback with the initialPage item:
    if (typeof (this.props.initialPage) !== 'undefined' && !this.props.disableInitialCallback) {
      this.callCallback(this.props.initialPage);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (typeof (nextProps.forcePage) !== 'undefined' && this.props.forcePage !== nextProps.forcePage) {
      this.setState({ selected: nextProps.forcePage });
    }
  }

  onPageSelected = (index, e) => {
      e.stopPropagation();
      this.handlePageSelected(index);
  };

  getPageElement(index) {
    return (
        <PageView
              onClick={e => this.onPageSelected(index,e)}
              selected={this.state.selected - 1 === index}
              pageClassName={this.props.pageClassName}
              pageLinkClassName={this.props.pageLinkClassName}
              activeClassName={this.props.activeClassName}
              extraAriaContext={this.props.extraAriaContext}
              href={this.hrefBuilder(index)}
              page={index + 1}
        />
    );
  }

  handlePreviousPage = (e) => {
      e.stopPropagation();
      if (this.state.selected > 0) {
          this.handlePageSelected(this.state.selected - 1);
      }
      return 0;
  };

  handleNextPage = e => {
      e.stopPropagation();
      if (this.state.selected < this.props.pageCount - 1) {
          this.handlePageSelected(this.state.selected + 1);
      }
  };


  handlePageSelected = (selected) => {
      if (this.state.selected === selected) return;

      this.setState({ selected: selected });

      // Call the callback with the new selected item:
      this.callCallback(selected);
  };

  hrefBuilder(pageIndex) {
      if (this.props.hrefBuilder &&
          pageIndex >= 0 &&
          pageIndex < this.props.pageCount
      ) {
          return this.props.hrefBuilder(pageIndex + 1);
      }
      return '';
  }

  callCallback = (selectedItem) => {
      if (typeof (this.props.onPageChange) !== 'undefined' &&
          typeof (this.props.onPageChange) === 'function') {
          this.props.onPageChange({ selected: selectedItem });
      }
  };

  pagination = () => {
    const items = {};
    if (this.props.pageCount <= this.props.pageRangeDisplayed) {
      for (let index = 0; index < this.props.pageCount; index += 1) {
        items[`key${index}`] = this.getPageElement(index);
      }
    } else {
      let leftSide = (this.props.pageRangeDisplayed / 2);
      let rightSide = (this.props.pageRangeDisplayed - leftSide);

      if (this.state.selected > (this.props.pageCount - (this.props.pageRangeDisplayed / 2))) {
        rightSide = this.props.pageCount - this.state.selected;
        leftSide = this.props.pageRangeDisplayed - rightSide;
      } else if (this.state.selected < this.props.pageRangeDisplayed / 2) {
        leftSide = this.state.selected;
        rightSide = this.props.pageRangeDisplayed - leftSide;
      }

      let index;
      let page;
      let breakView;

      for (index = 0; index < this.props.pageCount; index += 1) {
        page = index + 1;
        const pageView = this.getPageElement(index);

        if (page <= this.props.marginPagesDisplayed) {
          items[`key${index}`] = pageView;
          continue;
        }

        if (page > this.props.pageCount - this.props.marginPagesDisplayed) {
          items[`key${index}`] = pageView;
          continue;
        }

        if ((index >= this.state.selected - leftSide) && (index <= this.state.selected + rightSide)) {
          items[`key${index}`] = pageView;
          continue;
        }

        const keys = Object.keys(items);
        const breakLabelKey = keys[keys.length - 1];
        const breakLabelValue = items[breakLabelKey];

        if (this.props.breakLabel && breakLabelValue !== breakView) {
          breakView = (
            <BreakView
              breakLabel={this.props.breakLabel}
              breakClassName={this.props.breakClassName}
            />
          );

          items[`key${index}`] = breakView;
        }
      }
    }
    return items;
  };

  render() {
    const disabled = this.props.disabledClassName;

    const previousClasses = classNames(this.props.previousClassName,
                                       { [disabled]: this.state.selected === 0 });

    const nextClasses = classNames(this.props.nextClassName,
                                   { [disabled]: this.state.selected === this.props.pageCount - 1 });

    return (
      <ul className={this.props.containerClassName}>
        <li className={previousClasses}>
          <a
             onClick={this.handlePreviousPage}
             className={this.props.previousLinkClassName}
             href={this.hrefBuilder(this.state.selected - 1)}
             tabIndex="0"
             onKeyPress={this.handlePreviousPage}
          >
            {this.props.previousLabel}
          </a>
        </li>

        {createFragment(this.pagination())}

        <li className={nextClasses}>
          <a
              onClick={this.handleNextPage}
             className={this.props.nextLinkClassName}
             href={this.hrefBuilder(this.state.selected + 1)}
             tabIndex={this.state.selected + 1}
             onKeyPress={this.handleNextPage}
          >
            {this.props.nextLabel}
          </a>
        </li>
      </ul>
    );
  }
}
