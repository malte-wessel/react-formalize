import React, { PropTypes, createClass } from 'react';
import createInput from '../createInput';

function serialize(event) {
    const target = event.target;
    const { checked } = target;
    return checked;
}

const Checkbox = createClass({

    displayName: 'Checkbox',

    propTypes: {
        name: PropTypes.string.isRequired,
        value: PropTypes.bool
    },

    render() {
        const { value, disabled, ...restProps } = this.props;
        return (
            <input
                type="checkbox"
                value={true}
                checked={!!value}
                disabled={disabled}
                {...restProps}/>
        );
    }
});

export default createInput(Checkbox, serialize);
