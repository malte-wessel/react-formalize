import React, { PropTypes, createClass } from 'react';
import update from 'react-addons-update';
import { get as getPath } from 'object-path';
import invariant from 'invariant';

import formShape from '../utils/formShape';
import makePath from '../utils/makePath';

export default createClass({

    displayName: 'Form',

    propTypes: {
        values: PropTypes.object,
        messages: PropTypes.object,
        disabled: PropTypes.bool,
        onSubmit: PropTypes.func,
        onChange: PropTypes.func
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
        this.inputs = [];
        this.listeners = [];
    },

    componentWillReceiveProps(nextProps) {
        console.log('componentWillUpdate', this.props, nextProps);
        this.nextProps = nextProps;

        const {
            values: nextValues,
            messages: nextMessages,
            disabled: nextDisabled
        } = nextProps;

        const {
            values: prevValues,
            messages: prevMessages,
            disabled: prevDisabled
        } = this.props;

        if (
            prevValues === nextValues &&
            prevMessages === nextMessages &&
            prevDisabled === nextDisabled
        ) return;

        this.notify();
    },

    componentDidUpdate() {
        this.nextProps = undefined;
    },

    getMessage(key) {
        const props = this.nextProps || this.props;
        const { messages } = props;
        return getPath(messages, key);
    },

    getFormProps() {
        return this.nextProps || this.props;
    },

    getValue(key) {
        const props = this.nextProps || this.props;
        const { values } = props;
        return getPath(values, key);
    },

    setValue(key, value) {
        const mutation = makePath(key + '.$set', value);
        const values = update(this.values, mutation);
        const { onChange } = this.props;
        if (onChange) onChange(values);
    },

    register(name) {
        invariant(
            this.inputs.indexOf(name) < 0,
            'Naming conflict: there is already an input field with name `%s`',
            name
        );
        this.inputs.push(name);
        return () => {
            const { values, onChange } = this.props;
            const idx = this.inputs.indexOf(name);
            this.inputs.splice(idx, 1);
            if (onChange) onChange({ ...values, [name]: undefined });
        };
    },

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            const index = this.listeners.indexOf(listener);
            this.listeners.splice(index, 1);
        };
    },

    notify() {
        this.listeners.forEach(listener => listener());
    },

    handleSubmit(event) {
        const { onSubmit } = this.props;
        if (onSubmit) {
            event.preventDefault();
            onSubmit(this.values);
        }
    },

    render() {
        const {
            values,
            messages,
            onSubmit,
            onChange,
            disabled,
            ...props
        } = this.props;
        return (
            <form
                {...props}
                onSubmit={this.handleSubmit}/>
        );
    }
});
