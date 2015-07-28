import React, { PropTypes } from 'react';
import Input from '../Input';

export default class Checkbox extends React.Component {

    serialize(e) {
        // target is undefined in react@0.14.0-beta1
        // see https://github.com/facebook/react/issues/4288
        const target = e.target || e.currentTarget;
        const { checked } = target;
        return checked;
    }

    render() {
        return (
            <Input serialize={this.serialize} {...this.props}>
                {({value, ...props}) => {
                    const checked = !!value;
                    return <input type="checkbox" value="true" checked={checked} {...props}/>;
                }}
            </Input>
        );
    }
}
