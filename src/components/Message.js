import React, { PropTypes, createClass } from 'react';
import connectMessage from '../hoc/connectMessage';

const Message = createClass({
    displayName: 'Message',
    propTypes: {
        message: PropTypes.node
    },
    render() {
        const { message, ...props } = this.props;
        return <div {...props}>{message}</div>;
    }
});

export default connectMessage(Message);
