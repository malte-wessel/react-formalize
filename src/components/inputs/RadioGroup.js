import React, { PropTypes, createClass } from 'react';
import Input from '../Input';

function radio(name, selectedValue, disabled, onChange) {
    return createClass({

        displayName: 'Radio',

        render() {
            return (
                <input
                    {...this.props}
                    type="radio"
                    name={name}
                    checked={this.props.value === selectedValue}
                    disabled={disabled}
                    onChange={onChange.bind(null, this.props.value)} />
            );
        }
    });
}

export default createClass({

    displayName: 'RadioGroup',

    propTypes: {
        name: PropTypes.string.isRequired,
        children: PropTypes.func,
        options: PropTypes.object
    },

    serialize(value) {
        return value;
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

    renderInput(props) {
        const { children, options } = this.props;
        const { name, value, disabled, onChange } = props;
        const Radio = radio(name, value, disabled, onChange);
        const renderedChildren = options
            ? <div>{this.renderOptions(Radio, options)}</div>
            : children(Radio);
        return renderedChildren;
    },

    render() {
        const {children, options, ...props} = this.props;
        return (
            <Input serialize={this.serialize} {...props}>
                {this.renderInput}
            </Input>
        );
    }
});
