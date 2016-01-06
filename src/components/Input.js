import React, { PropTypes, createClass } from 'react';
import formShape from '../utils/formShape';
import shallowEqual from '../utils/shallowEqual';

function defaultSerialize(event) {
    const target = event.target;
    const { value } = target;
    return value;
}

export default createClass({

    displayName: 'Input',

    propTypes: {
        name: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.bool,
            React.PropTypes.number,
            React.PropTypes.object,
            React.PropTypes.string
        ]),
        serialize: PropTypes.func,
        children: PropTypes.func
    },

    contextTypes: {
        form: formShape
    },

    getDefaultProps() {
        return {
            value: null,
            serialize: defaultSerialize
        };
    },

    getInitialState() {
        const { form } = this.context;
        const { getValue } = form;
        const { name, value } = this.props;
        return {
            value: getValue(name) || value,
            disabled: false
        };
    },

    componentWillMount() {
        const { form } = this.context;
        const { register, subscribe } = form;
        const { name, value } = this.props;

        this.unregister = register(name, value);
        this.unsubscribe = subscribe(this.handleFormDataChange);
    },

    componentWillUpdate(nextProps) {
        const { form } = this.context;
        const { register } = form;

        const { value: nextValue, name: nextName } = nextProps;
        const { value: propsValue, name } = this.props;
        const { value: stateValue } = this.state;
        // Regard uncontrolled inputs, that save value in state
        const value = propsValue || stateValue;

        if (name === nextName && value === nextValue) return;

        const finalValue = name === nextName
            ? nextValue || stateValue
            : nextValue;

        this.unregister();
        this.unregister = register(nextName, finalValue);
    },

    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    },

    componentWillUnmount() {
        this.unregister();
        this.unsubscribe();
    },

    handleChange(...args) {
        const { name, serialize } = this.props;
        const { form } = this.context;
        const { setValue } = form;
        const value = serialize(...args);
        this.setState({ value });
        setValue(name, value);
    },

    handleFormDataChange() {
        const { name } = this.props;
        const { form } = this.context;
        const { getValue, getFormProps } = form;
        const { disabled } = getFormProps();
        const value = getValue(name);
        this.setState({ value, disabled });
    },

    render() {
        const { children, ...props } = this.props;
        const { value, disabled } = this.state;
        const onChange = this.handleChange;
        const onCut = this.handleChange;
        const onPaste = this.handleChange;
        return children({ ...props, value, disabled, onChange, onCut, onPaste });
    }
});
