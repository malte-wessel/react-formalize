import React, { PropTypes, createClass } from 'react';
import Input from '../Input';

export default createClass({

    displayName: 'Select',

    propTypes: {
        name: PropTypes.string.isRequired,
        options: PropTypes.object,
        children: PropTypes.node,
        placeholder: PropTypes.string
    },

    serialize(event) {
        const target = event.target;
        const { value, type } = target;

        if (type === 'select-multiple') {
            const values = [];
            const { options } = target;
            for (let i = 0, l = options.length; i < l; i++) {
                const option = options[i];
                if (option.selected) values.push(option.value);
            }
            return values;
        }

        return value;
    },

    renderOptions(options, multiple, placeholder) {
        const children = [];

        if (!multiple && placeholder) {
            children.push(
                <option
                    key="placeholder"
                    value=""
                    disabled>
                    {placeholder}
                </option>
            );
        }

        for (const value in options) {
            if (!options.hasOwnProperty(value)) continue;
            const label = options[value];
            children.push(
                <option
                    key={value}
                    value={value}>
                    {label}
                </option>
            );
        }
        return children;
    },

    renderInput(props) {
        const {
            options,
            multiple,
            placeholder,
            children
        } = this.props;

        const { value, ...restProps } = props;
        let finalValue = value;
        if (placeholder && !value) {
            // Set empty string as default value.
            // This will show up the placeholder option, when no value is set.
            finalValue = '';
        }

        return (
            <select value={finalValue} {...restProps}>
                {options
                    ? this.renderOptions(options, multiple, placeholder)
                    : children}
            </select>
        );
    },

    render() {
        const {children, value, multiple, ...props} = this.props;
        let finalValue = value;

        if (multiple && !Array.isArray(value)) {
            if (!value) finalValue = [];
            else finalValue = [value];
        }

        return (
            <Input serialize={this.serialize} value={finalValue} multiple={multiple} {...props}>
                {this.renderInput}
            </Input>
        );
    }
});
