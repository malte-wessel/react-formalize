import React, { PropTypes, createClass } from 'react';
import createInput from '../createInput';

function defaultRenderOption(props) {
    return <option {...props}/>;
}

function serialize(event) {
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
}

const Select = createClass({

    displayName: 'Select',

    propTypes: {
        name: PropTypes.string.isRequired,
        options: PropTypes.object,
        children: PropTypes.node,
        placeholder: PropTypes.any,
        renderOption: PropTypes.func
    },

    getDefaultProps() {
        return {
            renderOption: defaultRenderOption
        };
    },

    renderOptions(options, multiple, placeholder) {
        const { renderOption } = this.props;
        const children = [];

        if (!multiple && placeholder) {
            children.push(
                renderOption({
                    key: 'placeholder',
                    value: '',
                    disabled: true,
                    children: placeholder
                })
            );
        }

        for (const value in options) {
            if (!options.hasOwnProperty(value)) continue;
            const label = options[value];
            children.push(
                renderOption({
                    key: value,
                    value: value,
                    children: label
                })
            );
        }
        return children;
    },

    render() {
        const {
            multiple,
            children,
            value,
            options,
            placeholder,
            ...props
        } = this.props;

        let finalValue = value;
        if (placeholder && !value) {
            // Set empty string as default value.
            // This will show up the placeholder option, when no value is set.
            finalValue = '';
        }
        return (
            <select
                value={finalValue}
                multiple={multiple}
                {...props}>
                {options
                    ? this.renderOptions(options, multiple, placeholder)
                    : children}
            </select>
        );
    }
});

export default createInput(Select, serialize);
