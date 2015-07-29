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

    serialize(e) {
        // target is undefined in react@0.14.0-beta1
        // see https://github.com/facebook/react/issues/4288
        const target = e.target || e.currentTarget;
        const { value } = target;
        return value;
    }

    render() {
        return (
            <Input serialize={this.serialize} {...this.props}>
                {props => <input {...props}/>}
            </Input>
        );
    }
}
