import React, { PropTypes, Component } from 'react';
import Input from '../Input';

export default class TextArea extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired
    }

    render() {
        return (
            <Input {...this.props}>
                {props => <textarea {...props}/>}
            </Input>
        );
    }
}
