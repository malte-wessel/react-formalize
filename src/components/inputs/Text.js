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

    render() {
        return (
            <Input {...this.props}>
                {props => <input {...props}/>}
            </Input>
        );
    }
}
