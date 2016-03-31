import React, { PropTypes, createClass } from 'react';
import connectSelect from '../hoc/connectSelect';

const defaultRenderOption = props => {
    return <option {...props}/>;
};

const Select = createClass({

    displayName: 'Select',

    propTypes: {
        name: PropTypes.string.isRequired,
        options: PropTypes.object,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array
        ]).isRequired,
        placeholder: PropTypes.any,
        renderOption: PropTypes.func,
        onChange: PropTypes.func.isRequired,
        children: PropTypes.node,
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

export default connectSelect(Select);
