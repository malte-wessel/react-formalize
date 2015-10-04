import { Checkbox as CheckboxBase } from 'react-formalize';
import React, { createClass, PropTypes } from 'react';

export default createClass({

    displayName: 'Checkbox',

    propTypes: {
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    },

    render() {
        const { name, label, children, ...props } = this.props;
        return (
            <div className="checkbox">
                <label>
                    <CheckboxBase name={name} {...props}/> {label}
               </label>
            </div>
        );
    }
});
