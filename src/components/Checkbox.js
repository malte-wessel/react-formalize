import React, { createClass, PropTypes } from 'react';
import connectCheckbox from '../hoc/connectCheckbox';

const Checkbox = createClass({
    displayName: 'Checkbox',
    propTypes: {
        name: PropTypes.string.isRequired,
        checked: PropTypes.bool.isRequired,
        onChange: PropTypes.func.isRequired
    },
    getDefaultProps() {
        return { type: 'text' };
    },
    render() {
        return (
            <input
                {...this.props}
                type="checkbox"/>
        );
    }
});

export default connectCheckbox(Checkbox);
