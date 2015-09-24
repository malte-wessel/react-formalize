import React, { PropTypes } from 'react';
import formShape from '../utils/formShape';
import shallowEqual from '../utils/shallowEqual';

function defaultSerialize(event) {
    const target = event.target;
    const { value } = target;
    return value;
}

export default class Input extends React.Component {

    static propTypes = {
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
    };

    static defaultProps = {
        value: null,
        serialize: defaultSerialize
    }

    static contextTypes = {
        form: formShape
    };

    constructor(props, context) {
        super(props, context);
        const { form } = context;
        const { register, subscribe, getValue } = form;
        const { name, value } = props;

        this.handleFormDataChange = this.handleFormDataChange.bind(this);
        this.unregister = register(name, value);
        this.unsubscribe = subscribe(this.handleFormDataChange);

        this.state = {
            value: getValue(name) || value,
            disabled: false
        };
    }

    componentWillUpdate(nextProps) {
        if (shallowEqual(this.props, nextProps)) return;
        const { form } = this.context;
        const { register } = form;
        const { name, value } = nextProps;
        this.unregister();
        this.unregister = register(name, value);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    }

    componentWillUnmount() {
        this.unregister();
        this.unsubscribe();
    }

    handleChange(...args) {
        const { name, serialize } = this.props;
        const { form } = this.context;
        const { setValue } = form;
        const value = serialize(...args);
        setValue(name, value);
    }

    handleFormDataChange() {
        const { name } = this.props;
        const { form } = this.context;
        const { getValue, getFormProps } = form;
        const { disabled } = getFormProps();
        const value = getValue(name);
        this.setState({ value, disabled });
    }

    render() {
        const { children, ...props } = this.props;
        const { value, disabled } = this.state;
        const onChange = this.handleChange.bind(this);
        return children({ ...props, value, disabled, onChange });
    }
}
