import React, { PropTypes, createClass } from 'react';
import createInput from '../createInput';

const types = [
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
];

const Text = createClass({

    displayName: 'Text',

    propTypes: {
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf(types)
    },

    getDefaultProps() {
        return {
            type: 'text'
        };
    },

    render() {
        console.log('Text.render', this.props);
        return <input {...this.props}/>;
    }
});

export default createInput(Text);
