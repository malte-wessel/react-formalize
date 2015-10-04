import React, { PropTypes, createClass } from 'react';
import update from 'react-addons-update';
import { set as setPath, get as getPath } from 'object-path';
import merge from 'deepmerge';
import invariant from 'invariant';

import formShape from '../utils/formShape';
import makePath from '../utils/makePath';

export default createClass({

    displayName: 'Form',

    propTypes: {
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.func
        ]),
        values: PropTypes.object,
        messages: PropTypes.object,
        onSubmit: PropTypes.func,
        onChange: PropTypes.func,
        disabled: PropTypes.bool
    },

    childContextTypes: {
        form: formShape
    },

    getDefaultProps() {
        return {
            values: {},
            messages: {},
            disabled: false
        };
    },

    getChildContext() {
        return {
            form: {
                register: this.register,
                subscribe: this.subscribe,
                getValue: this.getValue,
                setValue: this.setValue,
                getMessage: this.getMessage,
                getFormProps: this.getFormProps
            }
        };
    },

    componentWillMount() {
        const { values } = this.props;
        this.values = { ...values };
        this.inputs = {};
        this.listeners = [];
    },

    componentDidMount() {
        // Now all inputs are registered
        this.collectValues();
    },

    componentWillReceiveProps(nextProps) {
        this.collectValues(nextProps);
    },

    componentDidUpdate() {
        this.collectValues();
    },

    handleSubmit(event) {
        const { onSubmit } = this.props;
        if (onSubmit) {
            event.preventDefault();
            onSubmit(this.values);
        }
    },

    collectValues(props = this.props) {
        const { inputs } = this;
        const inputData = {};

        // Run through registered inputs and create an object path with
        // the initial value, given by the input
        for (let path in inputs) {
            if (!inputs.hasOwnProperty(path)) continue;
            let initialValue = inputs[path];
            setPath(inputData, path, initialValue);
        }

        // Merge with current state
        const values = merge(inputData, props.values);

        this.values = values;
        this.notify();
    },

    register(name, initialValue) {
        invariant(
            this.inputs[name] === undefined,
            'Naming conflict: there is already an input field with name `%s`',
            name
        );

        this.inputs[name] = initialValue;
        return () => {
            const inputs = {};
            for (let key in this.inputs) {
                if (!this.inputs.hasOwnProperty(key)) continue;
                if (key === name) continue;
                inputs[key] = this.inputs[key];
            }
            this.inputs = inputs;
        };
    },

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            const index = this.listeners.indexOf(listener);
            this.listeners.splice(index, 1);
        };
    },

    getValue(key) {
        const values = this.values;
        return getPath(values, key) || values[key];
    },

    setValue(key, value) {
        const mutation = makePath(key + '.$set', value);
        const values = update(this.values, mutation);

        const { onChange } = this.props;
        if (onChange) onChange(values);

        this.values = values;
        this.notify();
    },

    getMessage(key) {
        const { messages } = this.props;
        return getPath(messages, key) || messages[key];
    },

    getFormProps() {
        const { children, ...props } = this.props;
        return props;
    },

    notify() {
        this.listeners.forEach(listener => listener());
    },

    render() {
        const values = this.values;
        const { onChange, onSubmit, messages, children, ...props } = this.props;
        return (
            <form
                {...props}
                onSubmit={this.handleSubmit}>
                {typeof children === 'function'
                    ? children(messages, values)
                    : children
                }
            </form>
        );
    }
});
