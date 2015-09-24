import React, { PropTypes, Component } from 'react';
import Input from '../Input';

export default class Checkbox extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        checked: PropTypes.bool
    }

    constructor(props, context) {
        super(props, context);
        this.renderInput = this.renderInput.bind(this);
    }

    serialize(event) {
        const target = event.target;
        const { checked } = target;
        return checked;
    }

    renderInput(props) {
        const { value, disabled, ...restProps } = props;
        return <input
            type="checkbox"
            value={true}
            checked={value}
            disabled={disabled}
            {...restProps}/>;
    }

    render() {
        const { checked, ...props } = this.props;
        return (
            <Input serialize={this.serialize} value={!!checked} {...props}>
                {this.renderInput}
            </Input>
        );
    }
}
