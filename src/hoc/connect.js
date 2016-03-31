import React, { PropTypes, createClass } from 'react';
import formShape from '../utils/formShape';
import shallowEqual from '../utils/shallowEqual';

function defaultMapFormPropsToState(wrapperProps, formProps) {
    const { disabled } = formProps;
    return { disabled };
}

function defaultMapStateToProps(state) {
    return state;
}

export default function connect(Component, options = {}) {
    const {
        mapFormPropsToState = defaultMapFormPropsToState,
        mapStateToProps = defaultMapStateToProps,
        pure = true
    } = options;

    return createClass({

        displayName: 'Connected',

        propTypes: {
            name: PropTypes.string
        },

        contextTypes: {
            form: formShape
        },

        getInitialState() {
            return this.getStateFromForm();
        },

        componentWillMount() {
            // @TODO: Check for value property and warn if a value was given
            const { form } = this.context;
            const { subscribe } = form;
            this.unsubscribe = subscribe(this.handleFormDataChange);
        },

        componentWillReceiveProps(nextProps) {
            const { name: prevName } = this.props;
            const { name: nextName } = nextProps;
            if (!prevName || prevName === nextName) return;
            const nextState = this.getStateFromForm(nextProps);
            this.setState(nextState);
        },

        shouldComponentUpdate(nextProps, nextState) {
            if (!pure) return true;
            return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
        },

        componentWillUnmount() {
            this.unsubscribe();
        },

        getStateFromForm(wrapperProps = this.props, formProps = this.context.form.getFormProps()) {
            return mapFormPropsToState(wrapperProps, formProps);
        },

        setStateFromForm(wrapperProps, formProps) {
            const nextState = this.getStateFromForm(wrapperProps, formProps);
            this.setState(nextState);
        },

        handleFormDataChange(formProps) {
            this.setStateFromForm(this.props, formProps);
        },

        render() {
            const state = mapStateToProps(this.state, this.props);
            const props = this.props;
            return <Component {...props} {...state}/>;
        }
    });
}
