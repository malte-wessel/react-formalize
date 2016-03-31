import React, { PropTypes, createClass } from 'react';
import connectInput from '../hoc/connectInput';

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
        type: PropTypes.oneOf(types),
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
    },
    getDefaultProps() {
        return { type: 'text' };
    },
    render() {
        const { onChange } = this.props;
        return (
            <input
                onCut={onChange}
                onPaste={onChange}
                {...this.props}/>
        );
    }
});

export default connectInput(Text);
