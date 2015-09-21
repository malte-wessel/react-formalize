import React, { PropTypes } from 'react';
import formShape from '../utils/formShape';
import shallowEqual from '../utils/shallowEqual';

function defaultSerialize(event) {
    const target = event.target || event.currentTarget;
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
        this.state = { value: getValue(name) || value };
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
        const { value } = this.state;
        const { form } = this.context;
        const { getValue } = form;
        const nextValue = getValue(name);
        if (nextValue === value) return;
        this.setState({ value: nextValue });
    }

    render() {
        const { children, ...props } = this.props;
        const { value } = this.state;
        const { form } = this.context;
        const { getFormProps } = form;
        const onChange = this.handleChange.bind(this);
        const formProps = getFormProps();
        return children({ ...props, value, onChange }, formProps);
    }
}
