import React, { PropTypes, Component } from 'react';
import Input from '../Input';

export default class Select extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        options: PropTypes.object,
        children: PropTypes.node
    }

    constructor(props, context) {
        super(props, context);
        this.renderInput = this.renderInput.bind(this);
    }

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
    }

    renderOptions(options) {
        const children = [];
        for (let value in options) {
            if (!options.hasOwnProperty(value)) continue;
            const label = options[value];
            children.push(<option key={value} value={value}>{label}</option>);
        }
        return children;
    }

    renderInput(props) {
        const { options, children } = this.props;
        return (
            <select {...props}>
                {options
                    ? this.renderOptions(options)
                    : children}
            </select>
        );
    }

    render() {
        const {children, options, value, multiple, ...props} = this.props;
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
}
