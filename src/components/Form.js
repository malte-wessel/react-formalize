import React, { PropTypes } from 'react';
import update from 'react-addons-update';
import { set as setPath, get as getPath } from 'object-path';
import merge from 'deepmerge';
import invariant from 'invariant';

import formShape from '../utils/formShape';
import makePath from '../utils/makePath';

export default class Form extends React.Component {

    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.func
        ]),
        values: PropTypes.object,
        messages: PropTypes.object,
        onSubmit: PropTypes.func,
        onChange: PropTypes.func
    };

    static defaultProps = {
        values: {},
        messages: {}
    }

    static childContextTypes = {
        form: formShape
    };

    constructor(props, context) {
        super(props, context);
        // set initial state
        const { values } = props;
        this.state = { values };
        this.inputs = {};
        this.listeners = [];
    }

    getChildContext() {
        return {
            form: {
                register: this.register.bind(this),
                subscribe: this.subscribe.bind(this),
                getValue: this.getValue.bind(this),
                setValue: this.setValue.bind(this),
                getMessage: this.getMessage.bind(this),
                getFormProps: this.getFormProps.bind(this)
            }
        };
    }

    componentDidMount() {
        // Now all inputs are registered
        this.collectValues();
    }

    componentWillReceiveProps(nextProps) {
        this.collectValues(nextProps);
    }

    componentDidUpdate() {
        this.notify();
    }

    handleSubmit(event) {
        const { onSubmit } = this.props;
        if (onSubmit) {
            event.preventDefault();
            onSubmit(this.state.values);
        }
    }

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

        this.setState({ values });
    }

    register(name, initialValue) {
        invariant(
            this.inputs[name] === undefined,
            'Naming conflict: there is already an input field with name `%s`',
            name
        );

        this.inputs[name] = initialValue;
        return () => {
            this.inputs[name] = undefined;
        };
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            const index = this.listeners.indexOf(listener);
            this.listeners.splice(index, 1);
        };
    }

    getValue(key) {
        const { values } = this.state;
        return getPath(values, key) || values[key];
    }

    setValue(key, value) {
        const mutation = makePath(key + '.$set', value);
        const values = update(this.state.values, mutation);

        const { onChange } = this.props;
        if (onChange) onChange(values);

        this.setState({ values }, this.notify);
    }

    getMessage(key) {
        const { messages } = this.props;
        return getPath(messages, key) || messages[key];
    }

    getFormProps() {
        const { children, ...props } = this.props;
        return props;
    }

    notify() {
        this.listeners.forEach(listener => listener());
    }

    render() {
        const { values } = this.state;
        const { onChange, onSubmit, messages, children, ...props } = this.props;
        return (
            <form
                {...props}
                onSubmit={this.handleSubmit.bind(this)}>
                {typeof children === 'function'
                    ? children(messages, values)
                    : children
                }
            </form>
        );
    }
}
