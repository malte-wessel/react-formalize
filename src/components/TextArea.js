import React, { createClass, PropTypes } from 'react';
import connectInput from '../hoc/connectInput';

const TextArea = createClass({
    displayName: 'TextArea',
    propTypes: {
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
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

export default connectInput(TextArea);
