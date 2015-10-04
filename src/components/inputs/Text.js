import React, { PropTypes, createClass } from 'react';
import Input from '../Input';

export default createClass({

    displayName: 'Text',

    propTypes: {
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
    },

    getDefaultProps() {
        return {
            type: 'text'
        };
    },

    renderInput(props) {
        return <input {...props}/>;
    },

    render() {
        return (
            <Input {...this.props}>
                {this.renderInput}
            </Input>
        );
    }
});
