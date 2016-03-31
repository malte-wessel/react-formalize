import { connectMessage } from 'react-formalize';
import React, { createClass, PropTypes } from 'react';

const FormGroup = createClass({

    displayName: 'FormGroup',

    propTypes: {
        name: PropTypes.string,
        message: PropTypes.string,
        label: PropTypes.string,
        children: PropTypes.node
    },

    render() {
        const { name, message, label, children, ...props } = this.props;
        return (
            <div className={`form-group ${message && 'has-error'}`}>
                <label className="col-sm-4 control-label">{label}</label>
                <div className="col-sm-8">
                    {children}
                    {message
                        ? <span className="help-block">{message}</span>
                        : null
                    }
                </div>
            </div>
        );
    }
});

export default connectMessage(FormGroup);
