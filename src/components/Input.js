import React, { PropTypes } from 'react';
import shallowEqual from '../utils/shallowEqual';

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
       children: PropTypes.func
    };

    static defaultProps = {
        value: ''
    }

    static contextTypes = {
        register: PropTypes.func,
        getValue: PropTypes.func,
        setValue: PropTypes.func
    };

    constructor(props, context) {
        super(props, context);
        const { register, getValue } = context;
        const { name, value } = props;
        this.unregister = register(name, value, this.handleFormDataChange.bind(this));
        this.state = { value: getValue(name) || value };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    }

    componentWillUnmount() {
        this.unregister();
    }

    handleChange(e) {
        const target = e.target || e.currentTarget;
        const { name } = this.props;
        const { value } = target;
        const { setValue } = this.context;
        setValue(name, value);
    }

    handleFormDataChange() {
        const { value, name } = this.props;
        const { getValue } = this.context;
        const state = { value: getValue(name) || value };
        this.setState(state);
    }

    render() {
        const { name, children, ...props } = this.props;
        const { value } = this.state;
        const onChange = this.handleChange.bind(this);

        return children({ ...props, value, onChange });
    }
}