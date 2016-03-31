import React, { PropTypes, createClass } from 'react';
import { get as getPath } from 'object-path';
import formShape from '../utils/formShape';
import connect from './connect';

function defaultSerialize(event) {
    const target = event.target;
    const { value } = target;
    return value;
}

function defaultMapFormPropsToState(wrapperProps, formProps) {
    const { values, disabled } = formProps;
    const { name } = wrapperProps;
    const value = getPath(values, name) || '';
    return { value, disabled };
}

export default function connectInput(Component, options = {}) {
    const {
        serialize = defaultSerialize,
        mapFormPropsToState = defaultMapFormPropsToState,
        ...restOptions
    } = options;

    const Wrapper = createClass({

        displayName: 'ConnectedInput',

        propTypes: {
            name: PropTypes.string.isRequired
        },

        contextTypes: {
            form: formShape
        },

        handleChange(...args) {
            const { name } = this.props;
            const { form } = this.context;
            const { handleChange } = form;
            const value = serialize(...args);
            handleChange(name, value);
        },

        render() {
            return (
                <Component
                    {...this.props}
                    onChange={this.handleChange}/>
            );
        }
    });

    return connect(Wrapper, {
        mapFormPropsToState,
        ...restOptions
    });
}
