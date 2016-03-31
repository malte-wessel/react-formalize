import React, { PropTypes, createClass } from 'react';
import connectInput from '../hoc/connectInput';

const createRadio = (name, selectedValue, disabled, onChange) => createClass({
    displayName: 'Radio',
    propTypes: {
        value: PropTypes.string.isRequired
    },
    handleChange() {
        const { value } = this.props;
        onChange(value);
    },
    render() {
        const { value } = this.props;
        return (
            <input
                {...this.props}
                type="radio"
                name={name}
                checked={value === selectedValue}
                disabled={disabled}
                onChange={this.handleChange}/>
        );
    }
});

const RadioGroup = createClass({
    displayName: 'RadioGroup',
    propTypes: {
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        options: PropTypes.object,
        disabled: PropTypes.bool,
        onChange: PropTypes.func.isRequired,
        children: PropTypes.func,
    },
    renderOptions(Radio, options) {
        const children = [];
        for (const value in options) {
            if (!options.hasOwnProperty(value)) continue;
            const label = options[value];
            children.push(
                <span key={value} key={value}>
                    <Radio value={value}/> {label}
                </span>
            );
        }
        return children;
    },
    render() {
        const { name, options, value, disabled, onChange, children, ...props } = this.props;
        const Radio = createRadio(name, value, disabled, onChange);
        if (options) return <div {...props}>{this.renderOptions(Radio, options)}</div>;
        return children(Radio, props);
    }
});

const serialize = value => value;

export default connectInput(
    RadioGroup,
    { serialize }
);
