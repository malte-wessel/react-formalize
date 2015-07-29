import React, { PropTypes, Component } from 'react';
import Input from '../Input';

export default class Select extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        children: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ])
    }

    static defaultProps = {
        children: {}
    }

    serialize(event) {
        // target is undefined in react@0.14.0-beta1
        // see https://github.com/facebook/react/issues/4288
        const target = event.target || event.currentTarget;
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

    render() {
        const {children, value, multiple, ...props} = this.props;
        let finalValue;

        if (multiple && !Array.isArray(value)) {
            if (!value) finalValue = [];
            else finalValue = [value];
        }

        return (
            <Input serialize={this.serialize} value={finalValue} multiple={multiple} {...props}>
                {innerProps => <select {...innerProps}>{children}</select>}
            </Input>
        );
    }
}
