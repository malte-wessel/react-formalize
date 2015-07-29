import React, { PropTypes, Component } from 'react';
import Input from '../Input';

export default class Checkbox extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired
    }

    serialize(event) {
        // target is undefined in react@0.14.0-beta1
        // see https://github.com/facebook/react/issues/4288
        const target = event.target || event.currentTarget;
        const { checked } = target;
        return checked;
    }

    render() {
        return (
            <Input serialize={this.serialize} value={false} {...this.props}>
                {({value, ...props}) => {
                    const checked = !!value;
                    return <input type="checkbox" value={true} checked={checked} {...props}/>;
                }}
            </Input>
        );
    }
}
