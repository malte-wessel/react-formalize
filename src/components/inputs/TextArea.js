import React, { PropTypes, createClass } from 'react';
import createInput from '../createInput';

const TextArea = createClass({

    displayName: 'TextArea',

    propTypes: {
        name: PropTypes.string.isRequired
    },

    render() {
        return <textarea {...this.props}/>;
    }
});

export default createInput(TextArea);
