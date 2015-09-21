import React, { PropTypes, Component } from 'react';
import Input from '../Input';

export default class Checkbox extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        checked: PropTypes.bool
    }

    serialize(event) {
        const target = event.target;
        const { checked } = target;
        return checked;
    }

    render() {
        const { checked, ...props } = this.props;
        return (
            <Input serialize={this.serialize} value={!!checked} {...props}>
                {({value, ...innerProps}, formProps) => {
                    const { disabled } = formProps;
                    return <input
                        type="checkbox"
                        value={true}
                        checked={value}
                        disabled={disabled}
                        {...innerProps}/>;
                }}
            </Input>
        );
    }
}
