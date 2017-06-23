import React from 'react';
import PropTypes from 'prop-types';

const Icon = (props) => {
    const classNames = [];
    if (props.className) {
        classNames.push(props.className);
    }
    return (
        <span className={classNames.join(' ')} aria-hidden="true" />
    );
}

Icon.propTypes = {
    className: PropTypes.string
};

export default Icon;
