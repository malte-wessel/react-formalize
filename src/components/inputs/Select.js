import React, { PropTypes, Component } from 'react';
import Input from '../Input';

export default class Select extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        children: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ])
    }

    static defaultProps = {
        children: {}
    }

    serialize(e) {
        // target is undefined in react@0.14.0-beta1
        // see https://github.com/facebook/react/issues/4288
        const target = e.target || e.currentTarget;
        const { value } = target;
        return value;
    }

    render() {
        const {children, ...props} = this.props;
        return (
            <Input serialize={this.serialize} {...props}>
                {innerProps => <select {...innerProps}>{children}</select>}
            </Input>
        );
    }
}
