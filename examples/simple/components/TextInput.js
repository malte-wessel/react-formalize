import React from 'react';
import { Input } from 'react-formalize';

export default class TextInput extends React.Component {
    render() {
        return (
            <Input {...this.props}>
                {props => <input {...props}/>}
            </Input>
        );
    }
}
