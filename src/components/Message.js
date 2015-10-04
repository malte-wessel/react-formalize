import React, { PropTypes, createClass } from 'react';
import formShape from '../utils/formShape';
import shallowEqual from '../utils/shallowEqual';

function defaultRenderMessage(message) {
    return <p>{message}</p>;
}

export default createClass({

    displayName: 'Message',

    propTypes: {
        name: PropTypes.string.isRequired,
        renderMessage: PropTypes.func,
        children: PropTypes.func
    },

    contextTypes: {
        form: formShape
    },

    getDefaultProps() {
        return {
            renderMessage: defaultRenderMessage
        };
    },

    getInitialState() {
        const { name } = this.props;
        const { form } = this.context;
        const { getMessage } = form;
        return {
            message: getMessage(name)
        };
    },

    componentWillMount() {
        const { form } = this.context;
        const { subscribe } = form;
        this.unsubscribe = subscribe(this.handleFormDataChange);
    },

    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    },

    componentWillUnmount() {
        this.unsubscribe();
    },

    handleFormDataChange() {
        const { name } = this.props;
        const { form } = this.context;
        const { getMessage } = form;
        const { message } = this.state;
        const nextMessage = getMessage(name);
        if (message === nextMessage) return;
        this.setState({ message: nextMessage });
    },

    render() {
        const { renderMessage, children, ...props } = this.props;
        const { message } = this.state;

        if (children) {
            return children(message, props);
        }

        if (message) return renderMessage(message);
        return false;
    }
});
