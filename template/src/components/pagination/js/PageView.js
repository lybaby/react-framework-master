import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PageView extends Component {
    static propTypes = {
        pageClassName: PropTypes.string,
        pageLinkClassName: PropTypes.string,
        onClick: PropTypes.func,
        href: PropTypes.any,
        page: PropTypes.number,
        extraAriaContext: PropTypes.string,
        selected: PropTypes.bool,
        activeClassName: PropTypes.string,

    };

    componentWillMount() {

    }

    render() {
        let cssClassName = this.props.pageClassName;
        const linkClassName = this.props.pageLinkClassName;
        const onClick = this.props.onClick;
        const href = this.props.href;
        let ariaLabel = `第${this.props.page}${(this.props.extraAriaContext ? ` ${this.props.extraAriaContext}` : '')}页`;

        if (this.props.selected) {
            ariaLabel = `第${this.props.page}页是当前页`;
            if (typeof (cssClassName) !== 'undefined') {
                cssClassName = `${cssClassName}  ${this.props.activeClassName}`;
            } else {
                cssClassName = this.props.activeClassName;
            }
        }

        return (
            <li className={cssClassName}>
              <a
                 onClick={onClick}
                 className={linkClassName}
                 href={href}
                 tabIndex={this.props.page}
                 aria-label={ariaLabel}
                 onKeyPress={onClick}
              >
                  {this.props.page}
              </a>
            </li>
        );
    }

}

export default PageView;
