import React, { PropTypes, createClass } from 'react';
import formShape from '../utils/formShape';

export default function createMessage(Component) {
    return createClass({
        displayName: 'Message',

        propTypes: {
            name: PropTypes.string.isRequired,
        },

        contextTypes: {
            form: formShape
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
            return (
                <Component
                    {...this.props}
                    {...this.state}/>
            );
        }
    });
}
