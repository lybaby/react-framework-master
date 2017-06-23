import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ControlCommon from './control-common';

class SelectControl extends Component {
  
    initElementRef = (element) => {
        this.element = element;
    }
  
    renderOption = (item, key) => {
        const optionProps = Object.assign({}, item);
        delete optionProps.label;
        delete optionProps.group;
        return (
          <option key={key} {...optionProps}>{item.label}</option>
        );
    }

    render() {
        const options = this.props.options;

        let groups = options.filter((item) => item.group).map((item) => item.group);
        // Get the unique items in group.
        groups = [...new Set(groups)];

        let optionNodes = [];

        if (groups.length === 0) {
            optionNodes = options.map((item, index) => this.renderOption(item, index));
        } else {
            // For items without groups.
            const itemsWithoutGroup = options.filter((item) => !item.group);

            itemsWithoutGroup.forEach((item, index) => {
                optionNodes.push(this.renderOption(item, `no-group-${index}`));
            });

            groups.forEach((group, groupIndex) => {
                const groupItems = options.filter((item) => item.group === group);
                const groupOptionNodes = groupItems.map((item, index) => this.renderOption(item, `${groupIndex}-${index}`));

                optionNodes.push(<optgroup label={group} key={groupIndex}>{groupOptionNodes}</optgroup>);
            });
        }

        const selectProps = Object.assign({}, this.props);
        delete selectProps.options;

        return (
            <select
                className="form-control"
                {...selectProps}
                ref={this.initElementRef}
            >
                {optionNodes}
            </select>
        );
    }
}

SelectControl.propTypes = {
    ...ControlCommon.propTypes,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string,
            group: PropTypes.string
        })
    ).isRequired,
    multiple: PropTypes.bool
};

SelectControl.defaultProps = {
    name: ''
};

export default SelectControl;
