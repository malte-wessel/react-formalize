import { Checkbox } from 'react-formalize';
import React, { createClass, PropTypes } from 'react';

export default createClass({

    displayName: 'Checkbox',

    propTypes: {
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    },

    render() {
        const { name, label, ...props } = this.props;
        return (
            <div className="checkbox">
                <label>
                    <Checkbox name={name} {...props}/> {label}
               </label>
            </div>
        );
    }
});
