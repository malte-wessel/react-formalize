import React, { PropTypes, createClass } from 'react';
import Input from '../Input';

export default createClass({

    displayName: 'TextArea',

    propTypes: {
        name: PropTypes.string.isRequired
    },

    renderInput(props) {
        return <textarea {...props}/>;
    },

    render() {
        return (
            <Input {...this.props}>
                {this.renderInput}
            </Input>
        );
    }
});
