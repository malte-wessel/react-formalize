import { Checkbox as CheckboxBase } from 'react-formalize';
import React, { Component, PropTypes } from 'react';

export default class Checkbox extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    }

    render() {
        const { name, label, children, ...props } = this.props;
        return (
            <div className="checkbox">
                <label>
                    <CheckboxBase name={name} {...props}/> {label}
               </label>
            </div>
        );
    }
}
