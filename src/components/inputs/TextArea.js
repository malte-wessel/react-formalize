import React, { PropTypes, Component } from 'react';
import Input from '../Input';

export default class TextArea extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired
    }

    constructor(props, context) {
        super(props, context);
        this.renderInput = this.renderInput.bind(this);
    }

    renderInput(props) {
        return <textarea {...props}/>;
    }

    render() {
        return (
            <Input {...this.props}>
                {this.renderInput}
            </Input>
        );
    }
}
