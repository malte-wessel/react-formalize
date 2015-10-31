import React, { PropTypes, createClass } from 'react';
import Input from '../Input';

export default createClass({

    displayName: 'Checkbox',

    propTypes: {
        name: PropTypes.string.isRequired,
        checked: PropTypes.bool
    },

    serialize(event) {
        const target = event.target;
        const { checked } = target;
        return checked;
    },

    renderInput(props) {
        const { value, disabled, ...restProps } = props;
        return (
            <input
                type="checkbox"
                value={true}
                checked={value}
                disabled={disabled}
                {...restProps}/>
        );
    },

    render() {
        const { checked, ...props } = this.props;
        return (
            <Input serialize={this.serialize} value={!!checked} {...props}>
                {this.renderInput}
            </Input>
        );
    }
});
