import { Message } from 'react-formalize';
import React, { createClass, PropTypes } from 'react';

export default createClass({

    displayName: 'FormGroup',

    propTypes: {
        name: PropTypes.string,
        label: PropTypes.string,
        children: PropTypes.node
    },

    renderGroup(message) {
        const { label, children } = this.props;
        return (
            <div className={'form-group ' + (message ? 'has-error' : null)}>
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
    },

    render() {
        const { name, ...props } = this.props;
        if (name) return <Message name={name}>{this.renderGroup}</Message>;
        return this.renderGroup();
    }
});
