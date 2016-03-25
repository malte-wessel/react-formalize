import React, { PropTypes, createClass } from 'react';
import createInput from '../createInput';

function radio(name, selectedValue, disabled, onChange) {
    return createClass({
        displayName: 'Radio',
        handleChange() {
            onChange(this.props.value);
        },
        render() {
            return (
                <input
                    {...this.props}
                    type="radio"
                    name={name}
                    checked={this.props.value === selectedValue}
                    disabled={disabled}
                    onChange={this.handleChange} />
            );
        }
    });
}

function serialize(value) {
    return value;
}

const RadioGroup = createClass({

    displayName: 'RadioGroup',

    propTypes: {
        name: PropTypes.string.isRequired,
        children: PropTypes.func,
        options: PropTypes.object
    },

    renderOptions(Radio, options) {
        const children = [];
        for (const value in options) {
            if (!options.hasOwnProperty(value)) continue;
            const label = options[value];
            children.push(
                <span key={value}>
                    <Radio value={value}/>
                    {' '}
                    {label}
                </span>
            );
        }
        return children;
    },

    render() {
        const { children, options, name, value, disabled, onChange } = this.props;
        const Radio = radio(name, value, disabled, onChange);
        const renderedChildren = options
            ? <div>{this.renderOptions(Radio, options)}</div>
            : children(Radio);
        return renderedChildren;
    }
});

export default createInput(RadioGroup, serialize);
