import React, { PropTypes, Component } from 'react';
import Input from '../Input';

export default class TextArea extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired
    }

    render() {
        return (
            <Input {...this.props}>
                {(props, formProps) => {
                    const { disabled } = formProps;
                    return <textarea
                        disabled={disabled}
                        {...props}/>;
                }}
            </Input>
        );
    }
}
