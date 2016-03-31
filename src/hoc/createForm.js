import React, { PropTypes, createClass } from 'react';
import update from 'react-addons-update';
import formShape from '../utils/formShape';
import makePath from '../utils/makePath';

function cleanProps(props) {
    const { children, ...rest } = props;
    return rest;
}

function defaultUpdateValue(name, value, values) {
    const mutation = makePath(`${name}.$set`, value);
    return update(values, mutation);
}

export default function createFormProvider(Component, options = {}) {
    const {
        updateValue = defaultUpdateValue
    } = options;
    return createClass({

        displayName: 'FormProvider',

        propTypes: {
            values: PropTypes.object.isRequired,
            messages: PropTypes.object,
            disabled: PropTypes.bool,
            onChange: PropTypes.func.isRequired,
            onSubmit: PropTypes.func
        },

        childContextTypes: {
            form: formShape
        },

        getDefaultProps() {
            return {
                messages: {},
                disabled: false
            };
        },

        getChildContext() {
            return {
                form: {
                    subscribe: this.subscribe,
                    handleChange: this.handleInputChange,
                    getFormProps: this.getFormProps
                }
            };
        },

        componentWillMount() {
            this.listeners = [];
        },

        componentWillUpdate(nextProps) {
            this.notify(nextProps);
        },

        componentWillUnmount() {
            this.listeners = [];
        },

        getFormProps() {
            return cleanProps(this.props);
        },

        handleInputChange(name, value) {
            const { values, onChange } = this.props;
            const nextValues = updateValue(name, value, values);
            if (onChange) onChange(nextValues);
        },

        subscribe(listener) {
            this.listeners.push(listener);
            return () => {
                const index = this.listeners.indexOf(listener);
                this.listeners.splice(index, 1);
            };
        },

        notify(props) {
            const cleanedProps = cleanProps(props);
            this.listeners.forEach(listener => listener(cleanedProps));
        },

        handleSubmit(event) {
            const { onSubmit, values } = this.props;
            if (onSubmit) {
                event.preventDefault();
                onSubmit(values);
            }
        },

        render() {
            const {
                values,
                messages,
                disabled,
                onChange,
                onSubmit,
                ...props
            } = this.props;
            return (
                <Component
                    {...props}
                    onSubmit={this.handleSubmit}/>
            );
        }
    });
}
