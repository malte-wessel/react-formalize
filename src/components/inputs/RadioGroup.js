import React from 'react';
import Input from '../Input';

function radio(name, selectedValue, onChange) {
    return class Radio extends React.Component {
        render() {
            return (
                <input
                    {...this.props}
                    type="radio"
                    name={name}
                    checked={this.props.value === selectedValue}
                    onChange={onChange.bind(null, this.props.value)} />
            );
        }
    };
}

export default class RadioGroup extends React.Component {

    serialize(value) {
        return value;
    }

    render() {
        const {children, ...props} = this.props;

        return (
            <Input serialize={this.serialize} {...this.props}>
                {({name, value, onChange, ...innerProps}) => {
                    const renderedChildren = children(radio(name, value, onChange));
                    return renderedChildren && React.Children.only(renderedChildren);
                }}
            </Input>
        );
    }
}
