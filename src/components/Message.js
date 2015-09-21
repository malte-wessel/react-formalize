import React, { PropTypes } from 'react';
import formShape from '../utils/formShape';
import shallowEqual from '../utils/shallowEqual';

function defaultRenderMessage(message) {
    return <p>{message}</p>;
}

export default class Message extends React.Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        renderMessage: PropTypes.func,
        children: PropTypes.func
    };

    static defaultProps = {
        renderMessage: defaultRenderMessage
    }

    static contextTypes = {
        form: formShape
    };

    constructor(props, context) {
        super(props, context);
        const { name } = props;
        const { form } = context;
        const { subscribe, getMessage } = form;
        this.handleFormDataChange = this.handleFormDataChange.bind(this);
        this.unsubscribe = subscribe(this.handleFormDataChange);
        this.state = { message: getMessage(name)};
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleFormDataChange() {
        const { name } = this.props;
        const { form } = this.context;
        const { getMessage } = form;
        const { message } = this.state;
        const nextMessage = getMessage(name);
        if (message === nextMessage) return;
        this.setState({ message: nextMessage });
    }

    render() {
        const { renderMessage, children, ...props } = this.props;
        const { message } = this.state;

        if (children) {
            return children(message, props);
        }

        if (message) return renderMessage(message);
        return false;
    }
}
