import { createForm } from 'react-formalize';
import React, { createClass, PropTypes } from 'react';

const Form = createClass({

    displayName: 'Form',

    propTypes: {
        messages: PropTypes.object,
        children: PropTypes.node,
    },

    render() {
        const { messages, children, ...props } = this.props;
        return (
            <form className="form-horizontal" {...props}>
                {messages && Object.keys(messages).length > 0 &&
                    <div className="alert alert-danger">
                        Whoops, looks like some fields have errors.
                    </div>
                }
                {children}
            </form>
        );
    }
});

export default createForm(Form);
