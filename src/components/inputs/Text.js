import React, { PropTypes, Component } from 'react';
import Input from '../Input';

export default class Text extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf([
            'date',
            'datetime',
            'datetime-local',
            'email',
            'month',
            'number',
            'password',
            'tel',
            'text',
            'time',
            'search',
            'url',
            'week'
        ])
    }

    static defaultProps = {
        type: 'text'
    }

    constructor(props, context) {
        super(props, context);
        this.renderInput = this.renderInput.bind(this);
    }

    renderInput(props) {
        return <input {...props}/>;
    }

    render() {
        return (
            <Input {...this.props}>
                {this.renderInput}
            </Input>
        );
    }
}
