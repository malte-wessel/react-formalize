import React, { PropTypes } from 'react';
import update from 'react-addons-update';
import { set as setPath, get as getPath } from 'object-path';
import merge from 'deepmerge';
import makePath from '../utils/makePath';

export default class Form extends React.Component {

    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ]),
        data: PropTypes.object,
        onSubmit: PropTypes.func,
        onChange: PropTypes.func
    };

    static defaultProps = {
        data: {}
    }

    static childContextTypes = {
        register: PropTypes.func,
        getValue: PropTypes.func,
        setValue: PropTypes.func
    };

    constructor(props, context) {
        super(props, context);
        // set initial state
        const { data } = this.props;
        this.state = { data };

        this.inputs = {};
        this.listeners = [];
    }

    getChildContext() {
        return {
            register: this.register.bind(this),
            getValue: this.getValue.bind(this),
            setValue: this.setValue.bind(this)
        };
    }

    componentDidMount() {
        // Now all inputs are registered
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
        const data = merge(inputData, this.state.data);

        this.setState({ data });
    }

    handleSubmit(event) {
        const { onSubmit } = this.props;
        if (onSubmit) {
            event.preventDefault();
            onSubmit(this.state.data);
        }
    }

    register(name, initialValue, listener) {
        this.inputs[name] = initialValue;
        this.listeners.push(listener);
        return () => {
            this.inputs[name] = undefined;
            const index = this.listeners.indexOf(listener);
            this.listeners.splice(index, 1);
        };
    }

    getValue(key) {
        const { data } = this.state;
        return getPath(data, key);
    }

    setValue(key, value) {
        const mutation = makePath(key + '.$set', value);
        const data = update(this.state.data, mutation);

        const { onChange } = this.props;
        if (onChange) onChange(data);

        this.setState({ data }, this.notify);
    }

    notify() {
        this.listeners.forEach(listener => listener());
    }

    render() {
        const { onChange, onSubmit, ...props } = this.props;
        return (
            <form
                {...props}
                onSubmit={this.handleSubmit.bind(this)}>
                {this.props.children}
            </form>
        );
    }
}
