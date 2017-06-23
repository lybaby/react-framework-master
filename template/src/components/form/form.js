import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import OptionsProvider from './hoc/options-provider';
import './form.scss';

class Form extends Component {

    render() {
        const formsyProps = Object.assign({}, this.props);
        delete formsyProps.elementWrapperClassName;
        delete formsyProps.labelClassName;
        delete formsyProps.layout;
        delete formsyProps.rowClassName;
        delete formsyProps.validatePristine;
        delete formsyProps.validateOnSubmit;

        return (
            <OptionsProvider
                {...this.props}
            >
                <Formsy.Form
                    {...formsyProps}
                    className={`form-${this.props.layout}`}
                    ref="formsy"
                >
                    {this.props.children}
                </Formsy.Form>
            </OptionsProvider>
        );
    }
}

Form.propTypes = {
    layout: PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']).isRequired,
    children: PropTypes.node
}

Form.defaultProps = {
    layout: 'horizontal'
}

export default Form;
