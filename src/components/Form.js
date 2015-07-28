import React, { PropTypes } from 'react';
import objectPath from 'object-path';

import cloneDeep from 'lodash/lang/cloneDeep';
import each from 'lodash/collection/each';
import merge from 'lodash/object/merge';

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
        const { data } = this.props;
        this.state = { data };
        this.inputs = {};
        this.listeners = [];
    }

    getChildContext() {
        return {
            register: this.register.bind(this),
            getValue: this.getValueForInput.bind(this),
            setValue: this.setValueForInput.bind(this)
        };
    }

    componentDidMount() {
        // Now all inputs are registered
        // @TODO: Refactor, better performance
        const data = {};
        each(this.inputs, (initialValue, name) => {
            objectPath.set(data, name, initialValue);
        });
        merge(data, this.state.data);
        this.setState({ data });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { onSubmit } = this.props;
        if (onSubmit) onSubmit(this.state.data);
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

    getValueForInput(key) {
        const { data } = this.state;
        return objectPath.get(data, key);
    }

    setValueForInput(key, value) {
        // @TODO: Refactor, better performance
        const data = cloneDeep(this.state.data);
        objectPath.set(data, key, value);

        const { onChange } = this.props;
        if (onChange) onChange(data);

        this.setState({ data }, () => {
            this.listeners.forEach(listener => listener());
        });
    }

    render() {
        const { onChange, ...props } = this.props;
        return (
            <form
                {...props}
                onSubmit={this.handleSubmit.bind(this)}>
                {this.props.children}
            </form>
        );
    }
}
