import React, { PropTypes, createClass } from 'react';
import formShape from '../utils/formShape';

function defaultSerialize(event) {
    const target = event.target;
    const { value } = target;
    return value;
}

export default function createInput(Component, serialize = defaultSerialize) {
    return createClass({

        displayName: 'Input',

        propTypes: {
            name: PropTypes.string.isRequired
        },

        contextTypes: {
            form: formShape
        },

        getInitialState() {
            return this.getStateFromForm();
        },

        getStateFromForm(props = this.props) {
            const { form } = this.context;
            const { getValue, getFormProps } = form;
            const { name } = props;
            const value = getValue(name);
            const { disabled } = getFormProps();
            return { value, disabled };
        },

        componentWillMount() {
            // @TODO: Check for value property and warn if a value was given
            const { form } = this.context;
            const { register, subscribe } = form;
            const { name } = this.props;
            this.unregister = register(name);
            this.unsubscribe = subscribe(this.handleFormDataChange);
        },

        componentWillReceiveProps(nextProps) {
            const { form } = this.context;
            const { register } = form;
            const { name: prevName } = this.props;
            const { name: nextName } = nextProps;
            if (prevName === nextName) return;
            this.unregister();
            this.unregister = register(nextName);
            const nextState = this.getStateFromForm(nextProps);
            this.setState(nextState);
        },

        componentWillUnmount() {
            this.unregister();
            this.unsubscribe();
        },

        handleChange(...args) {
            const { name } = this.props;
            const { form } = this.context;
            const { setValue } = form;
            const value = serialize(...args);
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
            return (
                <Component
                    {...this.props}
                    {...this.state}
                    onChange={this.handleChange}/>
            );
        }
    });
}
