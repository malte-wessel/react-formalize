import React, { PropTypes, Component } from 'react';
import Input from '../Input';

function radio(name, selectedValue, onChange, formProps) {
    return class Radio extends Component {
        render() {
            const { disabled } = formProps;
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
    };
}

export default class RadioGroup extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        children: PropTypes.func,
        options: PropTypes.object
    }

    serialize(value) {
        return value;
    }

    renderOptions(Radio, options) {
        const children = [];
        for (let value in options) {
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
    }

    render() {
        const {children, options, ...props} = this.props;

        return (
            <Input serialize={this.serialize} {...props}>
                {({name, value, onChange, ...innerProps}, formProps) => {
                    const Radio = radio(name, value, onChange, formProps);
                    const renderedChildren = options
                        ? <div>{this.renderOptions(Radio, options)}</div>
                        : children(Radio);
                    return renderedChildren;
                }}
            </Input>
        );
    }
}
